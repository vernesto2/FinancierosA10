import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  private base_uri = environment.base_uri;
  
  constructor(private http: HttpClient) { }
}
