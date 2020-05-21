import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import * as fromActions from '../actions/directorio.actions';
import { DirectorioModel } from 'src/app/commons/models/directorio.model';

export interface DirectorioState {
    directorioBase: DirectorioModel,
}

export const initialState: DirectorioState = {
    directorioBase: null,
}
const _directorioReducer = createReducer(initialState,

    on(fromActions.setDirectorioBase, (state, { dir }) => ({
        ...state,
        directorioBase: dir
    })),

);

export function directorioReducer(state: DirectorioState | undefined, action: Action) {
    return _directorioReducer(state, action);
}