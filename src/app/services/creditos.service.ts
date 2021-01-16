import { CreditoModel } from 'app/models/credito.model';
import { CreditoEmpresaModel } from './../models/creditoEmpresa.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditoPersonalModel } from 'app/models/creditoPersonal.model';
import { environment } from 'environments/environment';
import { IngresoEgresoModel } from 'app/models/ingresoEgreso.model';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  
  private base_uri = environment.base_uri;
  
  constructor(private http: HttpClient) { }

  agregarCreditoPersona(credito: CreditoModel, tipoCredito: string, tipoTiempo: string): Observable<any> {
    if (tipoTiempo == 'año') {
      credito.tiempo = credito.tiempo * 12;
    }
    console.log(credito.tiempo);
    return this.http.post(`${this.base_uri}/credito/PERSONA/${tipoCredito}`, credito, { observe: 'response'});
  }

  agregarCreditoEmpresa(creditoEmp: CreditoPersonalModel): Observable<any> {
    return this.http.post(`${this.base_uri}/`, creditoEmp, { observe: 'response'});
  }

  calcularPrecredito(monto: number, tiempo: number, tipoCredito: string, fecha: Date): Observable<any> {
    const dias = fecha.getDate(); //sacamos los dias actual
    const mes = fecha.getMonth(); // sacamos los meses actual
    const año = fecha.getFullYear(); // sacamos el año actual

    let fechas = año + '-' + mes+1 + '-' + dias;
    console.log(fechas);
    return this.http.get(`${this.base_uri}/credito/precredito/${monto}/${tiempo}/${tipoCredito}/${fechas}`, { observe: 'response'});
  }

  rangoPolitica(): Observable<any> {
    return this.http.get(`${this.base_uri}/politica/rangopolitica`,  { observe: 'response'});
  }

  comprobarIngresos(ingresosEgresosCliente: IngresoEgresoModel, ingresosEgresosFiador: IngresoEgresoModel): Observable<any> {
    return this.http.post(`${this.base_uri}/credito/ingresosegresos`, {ingresosEgresosFiador, ingresosEgresosCliente}, {observe: 'response'});
  }
}
