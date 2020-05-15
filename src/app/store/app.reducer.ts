import * as fromLectura from './reducers/lectura.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    lectura: fromLectura.LecturaState;
}

export const appReducers: ActionReducerMap<AppState> = {
    lectura: fromLectura.lecturaReducer
};
