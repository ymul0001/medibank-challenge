import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import './HomePage.css';
import { OwnerProps } from '../../types/interfaces/props/OwnerProps';
import { Owner } from '../../types/interfaces/model/Owner';
import PetsAccordion from '../../components/pets-accordion/PetsAccordion';
import CircularProgress from '@mui/material/CircularProgress';

export const HomePage = () => {
    const { get } = useFetch();
    const [curatedOwners, setCuratedOwners] = useState<OwnerProps[]>([]);
    const [isRevealClicked, setIsRevealClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const getOwnerWithPets = async () : Promise<any> => {
        setIsLoading(true);

        const response = await get("https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json");
        
        if (!response.ok){
            setIsLoading(false);
            throw new Error("Cannot get owners data.");
        }
        
        const data = await response.json();

        const result : OwnerProps[] = [];
        const rawOwners : Owner[] = data;
        const genders : string[] = [...new Set(rawOwners.map(o => o.gender))];
        
        for (const gender of genders) {
            const ownerData: OwnerProps = {
                gender: gender,
                pets: []
            };
        
            for (const owner of rawOwners) {
                if (owner.gender === ownerData.gender && owner.pets) {
                    ownerData.pets.push(...owner.pets.filter(pet => pet.type.toLowerCase() === "cat"));
                }
            }
        
            ownerData.pets.sort((a, b) => a.name.localeCompare(b.name));

            result.push(ownerData);
        }
        
        setCuratedOwners(oldData => [...oldData, ...result] );
        setIsRevealClicked(true);
        setIsLoading(false);
    }

    return(
        <div className="placeholder">
            <div className="banner">
                <h1 className="banner__header">Find Your Cats!</h1>
                <p className="banner__description">Are you curious on the number of cats hiding behind the owners?</p>
                <p className="banner__description">Find out by clicking on this button.</p>
                <button className="banner__button" onClick={getOwnerWithPets} disabled={isRevealClicked}>
                    Reveal
                </button>
            </div>
            <div className="result">
                {!isLoading && curatedOwners.length > 0 && (
                    <div className="result__element">
                        {curatedOwners.map(o => <PetsAccordion gender={o.gender} pets={o.pets} />)}
                    </div>
                )}
                {isLoading && (
                    <div className="loading">
                        <CircularProgress  color="error" />
                    </div>
                )}
                {!isLoading && curatedOwners.length === 0 && (
                    <img className="default-image" height={400} src={require("../../assets/cat-loading.png")} alt="cat loading icon"/>
                )}
            </div>
        </div>
    )
    
}