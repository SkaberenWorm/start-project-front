import * as fromLectura from './reducers/lectura.reducers';
import * as fromDirectorio from './reducers/directorio.reducers';
import * as fromEnviroment from './reducers/environment.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    lectura: fromLectura.LecturaState;
    directorio: fromDirectorio.DirectorioState;
    environment: fromEnviroment.EnviromentState;
}

export const appReducers: ActionReducerMap<AppState> = {
    lectura: fromLectura.lecturaReducer,
    directorio: fromDirectorio.directorioReducer,
    environment: fromEnviroment.environmentReducer
};
