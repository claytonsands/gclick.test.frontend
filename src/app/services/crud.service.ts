import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private endpoint;
  
  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
  }
  
  get(path: string, params?: HttpParams): Observable<any> {
    return this.http.get(`${this.endpoint}/${path}`, { params: params });
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${this.endpoint}/${path}`, body);
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${path}`, body);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.endpoint}/${path}`);
  }

}
