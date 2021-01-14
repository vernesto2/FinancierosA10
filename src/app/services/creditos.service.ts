import { CreditoModel } from 'app/models/credito.model';
import { CreditoEmpresaModel } from './../models/creditoEmpresa.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditoPersonalModel } from 'app/models/creditoPersonal.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  
  private base_uri = environment.base_uri;
  
  constructor(private http: HttpClient) { }

  agregarCreditoPersona(creditoPersonal: CreditoPersonalModel): Observable<any> {
    return this.http.post(`${this.base_uri}/credito`, creditoPersonal, { observe: 'response'});
  }

  agregarCreditoEmpresa(creditoEmp: CreditoPersonalModel): Observable<any> {
    return this.http.post(`${this.base_uri}/`, creditoEmp, { observe: 'response'});
  }

  calcularPrecredito(credito: CreditoModel, tipoCredito: string): Observable<any> {
    const dias = credito.fechaAprobacion.getDate(); //sacamos los dias actual
    const mes = credito.fechaAprobacion.getMonth(); // sacamos los meses actual
    const año = credito.fechaAprobacion.getFullYear(); // sacamos el año actual

    let fechas = año + '-' + mes+1 + '-' + dias;
    console.log(fechas);
    return this.http.get(`${this.base_uri}/credito/precredito/${credito.monto}/${credito.tiempo}/${tipoCredito}/${fechas}`, { observe: 'response'});
  }
}
