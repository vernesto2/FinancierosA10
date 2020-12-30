import { ActivoFijoModel } from './../models/activoFijo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivoFijoService {

  private base_uri = environment.base_uri;

  constructor(private http: HttpClient) { }

  listarActivos() {
    return this.http.get(`${this.base_uri}/activofijo`);
  }

  listarUnidad() {
    return this.http.get(`${this.base_uri}/unidad`);
  }

  listarDepartamentoPorUnidad(codigo: number) {
    return this.http.get(`${this.base_uri}/departamento/porunidad/${codigo}`);
  }

  listarTipoActivo() {
    return this.http.get(`${this.base_uri}/tipoactivo`);
  }

  correlativo(ctipo: number, cdepto: number, cunidad: number) {
    return this.http.get(`${this.base_uri}/activofijo/correlativo/${ctipo}/${cdepto}/${cunidad}`);
  }

  agregarActivoFijo(af: ActivoFijoModel) {
    return this.http.post(`${this.base_uri}/activofijo/`, af);
  }
}
