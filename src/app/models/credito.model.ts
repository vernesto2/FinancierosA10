import { CreditoPersonalModel } from './creditoPersonal.model';
import { CreditoEmpresaModel } from './creditoEmpresa.model';
import { PoliticaModel } from './politica.model';
import { BienGarantiaModel } from "./bienGarantia.model";
import { CobrosModel } from "./cobros.model";
import { UsuarioModel } from './usuario.model';

export class CreditoModel{
    id: number;
    estado: string;
    fechaAprobacion: Date;
    fechaCancelado: Date;
    fechaSolicitud: Date;
    monto: number;
    para: string;
    cobro: Array<CobrosModel>;
    puntos: number;
    bienGarantias: Array<BienGarantiaModel>;
    politica: PoliticaModel;
    usuario: UsuarioModel;
    creditoEmpresa: CreditoEmpresaModel;
    creditoPersona: CreditoPersonalModel;
    
}