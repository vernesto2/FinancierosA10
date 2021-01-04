import { DireccionModel } from "./direccion.model";
import { EmpresaModel } from "./empresa.model";

export class PersonaModel {
    nit: string;
    tipoPersona: string;
    empresa: EmpresaModel;
    direccion: DireccionModel;
}