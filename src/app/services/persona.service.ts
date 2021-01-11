import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { Observable, throwError } from 'rxjs';
import { EmpresaModel } from 'app/models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private base_uri = environment.base_uri;

  constructor(private http: HttpClient) { }

  listarDepartamento(): Observable<any> {
    return this.http.get(`${this.base_uri}/ubicacion/departamentos`, { observe: 'response' });
  }

  listarMunicipioPorDepto(codigo: number): Observable<any> {
    return this.http.get(`${this.base_uri}/ubicacion/listamunicipios/${codigo}`, { observe: 'response' });
  }

  listarPersonas(): Observable<any> {
    return this.http.get(`${this.base_uri}/personanatural`, { observe: 'response' });
  }

  agregarPersona(persona: PersonaNaturalModel): Observable<any> {
    return this.http.post(`${this.base_uri}/personanatural`, persona, { observe: 'response' });
  }

  editarPersona(persona: PersonaNaturalModel): Observable<any> {
    return this.http.put(`${this.base_uri}/personanatural/${persona.nit}`, persona, { observe: 'response' });
  }

  deptoPorCodigo(codigo: string): Observable<any> {
    //console.log(codigo);
    return this.http.get(`${this.base_uri}/ubicacion/${codigo}`, { observe: 'response' });
  }

  listarEmpresa(): Observable<any> {
    return this.http.get(`${this.base_uri}/empresa`, {observe: 'response'});
  }

  agregarEmpresa(empresa: EmpresaModel): Observable<any> {
    return this.http.post(`${this.base_uri}/empresa`, empresa, { observe: 'response' });
  }

  buscarPor(busqueda: any): Observable<any> {
    return this.http.get(`${this.base_uri}/personanatural`, {observe: 'response'});
  }

  buscarNIT(nit: string): Observable<any> {
    return this.http.get(`${this.base_uri}/personanatural/nit/${nit}`, {observe: 'response'});
  }
}
