import { CreditoPersonalModel } from './creditoPersonal.model';
import { CreditoEmpresaModel } from './creditoEmpresa.model';
import { PoliticaModel } from './politica.model';
import { BienGarantiaModel } from "./bienGarantia.model";
import { UsuarioModel } from './usuario.model';

export class CreditoModel{
    id: number;
    estado: string;
    fechaAprobacion: Date;
    fechaCancelado: Date;
    fechaSolicitud: Date;
    monto: number;
    tiempo: number;
    puntos: number;
    //bienGarantias: Array<BienGarantiaModel>;
    bienGarantia = new BienGarantiaModel();
    politica: PoliticaModel;
    usuario: UsuarioModel;
    creditoEmpresa: CreditoEmpresaModel;
    creditoPersona: CreditoPersonalModel;
    
}