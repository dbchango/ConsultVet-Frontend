import { Pet } from './pet';
import { Veterinary } from './veterinary';
import { Prescription } from './prescription';
export class Consult {
    idconsult?: string;
    date: string;
    observation:string;
    price: number;
    status: number;
    idpet: string;
    total: number;
    prescription: Array<Prescription> = [];
    idveterinary: string;
    pet?: Pet;
    veterinary?: Veterinary;
}
