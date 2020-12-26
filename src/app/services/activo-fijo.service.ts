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
}
