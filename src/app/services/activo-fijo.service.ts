import { ActivoFijoModel } from './../models/activoFijo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivoFijoService {

  private base_uri = environment.base_uri;

  constructor(private http: HttpClient) { }

  listarUnidad(): Observable<any> {
    return this.http.get(`${this.base_uri}/unidad`,{observe: 'response'});
  }

  listarDepartamentoPorUnidad(codigo: number): Observable<any>  {
    return this.http.get(`${this.base_uri}/departamento/porunidad/${codigo}`,{observe: 'response'});
  }

  listarTipoActivo(): Observable<any> {
    return this.http.get(`${this.base_uri}/tipoactivo`,{observe: 'response'});
  }

  listarActivo(): Observable<any> {
    return this.http.get(`${this.base_uri}/activofijo`,{observe: 'response'});
  }

  agregarActivo(activo: ActivoFijoModel): Observable<any>  {
    return this.http.post(`${this.base_uri}/activofijo`, activo,{observe: 'response'});
  }
}
