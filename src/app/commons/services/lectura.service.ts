import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArchivoModel } from '../models/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  private urlBase = `${environment.backend_url}api/lectura`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(public http: HttpClient) { }

  public leerFile(pathFile: string): Observable<ArchivoModel> {
    return this.http.get<ArchivoModel>(`${this.urlBase}?pathFile=${pathFile}`);
  }

}
