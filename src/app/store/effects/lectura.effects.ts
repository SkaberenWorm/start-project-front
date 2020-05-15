import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as lecturaActions from '../actions/lectura.actions';
import { LecturaService } from 'src/app/commons/services/lectura.service';

@Injectable()
export class LecturaEffects {
    constructor(private actions$: Actions, private lecturaService: LecturaService) { }


}