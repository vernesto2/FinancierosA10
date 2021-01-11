import { PersonaNaturalModel } from './personaNatural.model';
import { CreditoPersonalModel } from "./creditoPersonal.model";
import { IngresoEgresoModel } from "./ingresoEgreso.model";

export class GarantiaFiadorModel {
    creditoPersona: CreditoPersonalModel;
    ingresoEgreso: Array<IngresoEgresoModel>;
    personaNatual: PersonaNaturalModel;
}