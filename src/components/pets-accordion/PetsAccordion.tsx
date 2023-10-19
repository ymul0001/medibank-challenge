import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC } from "react"
import { OwnerProps } from "../../types/interfaces/props/OwnerProps";
import './PetsAccordion.css';

const PetsAccordion: FC<OwnerProps> = ({...props})  => {

    return(
        <Accordion className="accordion" disableGutters
        sx={{
            backgroundColor: "#000000",
            color: "#ffffff"
        }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      color: '#ffffff',
                    }
                }}
            >
            <Typography>{props.gender}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {props.pets && props.pets.map(pet => 
                <>
                    <Typography>
                        {pet.name}
                    </Typography>
                </>
            )}
            </AccordionDetails>
        </Accordion>
    )
}

export default PetsAccordion;