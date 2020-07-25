import { Pet } from './pet';
import { Client } from './client';

export class Consult {
    idconsult: string;
    date: string;
    observation:string;
    price: number;
    responsable: string;
    status: number;
    idpet: string;
    idclient: string;
    pet: Pet;
    client: Client;


}
