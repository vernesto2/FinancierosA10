import { ActivoFijoModel } from "./activoFijo.model";
import { DepartamentoModel } from "./departamento.model";
import { UsuarioModel } from "./usuario.model";

export class AquisicionActivoModel {
    id: number;
    descripcion: string;
    fecha: Date;
    precioUnidad: number;
    tipoAdquisicion: string;
    vidaUtil: number;
    activoFijo: ActivoFijoModel;
    departamento: DepartamentoModel;
    usuario: UsuarioModel;
}