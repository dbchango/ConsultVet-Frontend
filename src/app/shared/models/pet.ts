import { Client } from './client';
import { VaccineReference } from './vaccine-reference';

export class Pet {
    idpet?: string;
    name: string;
    color: string; 
    age: string;
    idclient: string;
    type: string;
    sex: string;
    vaccines:  Array<VaccineReference> = [];
    client?: Client;
}
