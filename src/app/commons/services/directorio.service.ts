import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DirectorioModel } from '../models/directorio.model';

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {

  private urlBase = `${environment.backend_url}api/directorio`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(public http: HttpClient) { }

  public getDirectorios(path: string, directoriosDesplegados: Array<string>): Observable<Array<DirectorioModel>> {
    return this.http.post<Array<DirectorioModel>>(`${this.urlBase}?path=${path}`, directoriosDesplegados, { headers: this.headers });
  }

}
