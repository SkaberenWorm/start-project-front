import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public resizeObservable$: Observable<Event> = fromEvent(window, 'resize');

}
