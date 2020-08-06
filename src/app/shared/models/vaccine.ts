import { Pet } from './pet'

export class Vaccine {
    idvaccine?:string;
    date: string;
    name: string;
    responsable: string;
    observation: string;
    idpet: string;
    pet?:Pet
};