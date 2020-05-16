import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/lectura.actions';
import { Action } from '@ngrx/store';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';

export interface LecturaState {
    file: ArchivoModel,
}

export const initialState: LecturaState = {
    file: null,
}
const _lecturaReducer = createReducer(initialState,

    on(fromActions.setFileOpen, (state, { file }) => ({
        ...state,
        file: file,
    })),

);

export function lecturaReducer(state: LecturaState | undefined, action: Action) {
    return _lecturaReducer(state, action);
}