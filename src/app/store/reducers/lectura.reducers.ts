import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/lectura.actions';
import { Action } from '@ngrx/store';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';

export interface LecturaState {
    openFile: ArchivoModel,
    previewFile: ArchivoModel,
}

export const initialState: LecturaState = {
    openFile: null,
    previewFile: null
}
const _lecturaReducer = createReducer(initialState,

    on(fromActions.setOpenFile, (state, { file }) => ({
        ...state,
        openFile: file,
    })),
    on(fromActions.setPreviewFile, (state, { file }) => ({
        ...state,
        previewFile: file,
    })),
    on(fromActions.refreshFiles, (state) => ({
        ...state,
    })),

);

export function lecturaReducer(state: LecturaState | undefined, action: Action) {
    return _lecturaReducer(state, action);
}