import { Pet } from "../model/Pet";

export interface OwnerProps {
    gender: string,
    pets: Pet[]
}