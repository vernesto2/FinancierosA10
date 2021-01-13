import { AdquisicionActivoModel } from "./adquisicionActivo.model";
import { BajaActivoModel } from "./bajaActivo.model";
import { DetalleActivoPKModel } from "./detalleActivoPK.model";

export class DetalleActivoModel {
    id: DetalleActivoPKModel;
    precio: number;
    codigoGenerado: number;
    adquisicionActivoFijo: AdquisicionActivoModel;
    bajaActivoFijo: BajaActivoModel;
}