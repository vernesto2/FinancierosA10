import { Departamento } from "./departamento.mode";
import { TipoActivo } from "./tipoActivo.model";

export class ActivoFijoModel {
    id: number;
    correlativo: number;
    descripcion: string;
    fechaAdquisicion: Date;
    nombre: string;
    precioAdquisicion: number;
    tipoAdquisicion: number;
    vidaUtil: number;
    departamento: Departamento;
    tipoActivo: TipoActivo;
    codigoGenerado: string;
}