import * as fromLectura from './reducers/lectura.reducers';
import * as fromDirectorio from './reducers/directorio.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    lectura: fromLectura.LecturaState;
    directorio: fromDirectorio.DirectorioState;
}

export const appReducers: ActionReducerMap<AppState> = {
    lectura: fromLectura.lecturaReducer,
    directorio: fromDirectorio.directorioReducer
};
