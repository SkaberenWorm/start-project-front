import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {


  constructor(public http: HttpClient) {

  }



}
