import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private base_uri = environment.base_uri;

  constructor(private http: HttpClient) { }

  listarDepartamento() {
    return this.http.get(`${this.base_uri}/ubicacion/departamentos`);
  }

  listarMunicipioPorDepto(codigo: number) {
    return this.http.get(`${this.base_uri}/ubicacion/listamunicipios/${codigo}`);
  }

  listarPersonas() {
    return this.http.get(`${this.base_uri}/persona`);
  }
}
