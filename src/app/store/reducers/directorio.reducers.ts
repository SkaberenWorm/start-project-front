import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/directorio.actions';
import { Action } from '@ngrx/store';
import { DirectorioModel } from 'src/app/commons/models/directorio.model';

export interface DirectorioState {
    dir: DirectorioModel,
}

export const initialState: DirectorioState = {
    dir: null,
}
const _directorioReducer = createReducer(initialState,

    on(fromActions.setCurrentDirectory, (state, { dir }) => ({
        ...state,
        dir: dir,
    })),

);

export function directorioReducer(state: DirectorioState | undefined, action: Action) {
    return _directorioReducer(state, action);
}