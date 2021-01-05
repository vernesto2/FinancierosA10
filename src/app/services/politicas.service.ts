import { PoliticaModel } from './../models/politica.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoliticasService {

  private base_uri = environment.base_uri;
  
  constructor(private http: HttpClient) { }

  agregarPoliticas(politicas: PoliticaModel){
    return this.http.post(`${this.base_uri}/politica/`, politicas);
  }

  listarPoliticas(){
    return this.http.get(`${this.base_uri}/politica`);
  }
}
