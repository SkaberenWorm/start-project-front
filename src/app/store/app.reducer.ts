import * as fromDirectorio from './reducers/directorio.reducers';
import * as fromArchivo from './reducers/archivo.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    directorio: fromDirectorio.DirectorioState;
    archivo: fromArchivo.ArchivoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    directorio: fromDirectorio.directorioReducer,
    archivo: fromArchivo.lecturaReducer,
};
