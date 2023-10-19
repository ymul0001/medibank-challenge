import { Pet } from "./Pet";

export interface Owner {
    age: number,
    gender: string,
    name: string,
    pets: Pet[]
}