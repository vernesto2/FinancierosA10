import { PersonaModel } from "./persona.model";

export class PersonaNaturalModel {
    dui: string;
    nit: string;
    nombres: string;
    apellidos: string;
    estadoCivil: string;
    genero: number;
    fechaNacimiento: Date;
    persona: PersonaModel;
}