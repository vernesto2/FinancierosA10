import { CreditoModel } from "./credito.model";

export class BienGarantiaModel {
    descripcion: string;
    valoradoEn: number;
    tipoBien: number;
    creditos: Array<CreditoModel>;
}