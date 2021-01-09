import { PersonaModel } from "./persona.model";
import { PersonaNaturalModel } from "./personaNatural.model";

export class EmpresaModel {
    nit: string;
    personaNatural: PersonaNaturalModel;
    nombre: string;
    persona: PersonaModel;
}