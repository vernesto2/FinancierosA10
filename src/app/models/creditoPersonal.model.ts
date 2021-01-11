import { GarantiaFiadorModel } from './garantiaFiador.model';
import { PersonaModel } from './persona.model';
import { CreditoModel } from "./credito.model";

export class CreditoPersonalModel {
    idCredito: number;
    credito: CreditoModel;
    persona: PersonaModel;
    garantiaFiador: Array<GarantiaFiadorModel>;
    
}