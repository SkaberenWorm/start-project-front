import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/archivo.actions';
import { Action } from '@ngrx/store';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';
import { BaseArchivoModel } from 'src/app/commons/models/base-archivo.model';
import { tabs } from 'src/app/commons/components/editor/editor.component';

export interface ArchivoState {
    openFile: ArchivoModel,
    previewFile: ArchivoModel,
    loading: boolean,
    loaded: boolean,
    error: string,
    success: string,
    baseArchivo: BaseArchivoModel,
    selectedTab: number,
    updatingBaseArchivo: boolean,

    writingFile: boolean,
    writenFile: boolean,
}

export const initialState: ArchivoState = {
    openFile: null,
    previewFile: null,
    loading: false,
    loaded: false,
    error: null,
    success: null,
    baseArchivo: null,
    selectedTab: tabs.ENTIDAD,
    updatingBaseArchivo: false,
    writingFile: false,
    writenFile: false,
}
const _archivoReducer = createReducer(initialState,

    on(fromActions.readSelectedFile, (state, { pathFile }) => ({
        ...state,
        loading: true,
        loaded: false,
        openFile: null,
        load: false,
        error: null,
        success: null,
    })),
    on(fromActions.readSelectedFileSuccess, (state, { file }) => ({
        ...state,
        loading: false,
        loaded: true,
        openFile: file
    })),
    on(fromActions.readSelectedFileFail, (state, { mensaje }) => ({
        ...state,
        loading: false,
        error: mensaje
    })),


    on(fromActions.previewFile, (state, { tipo: tipo, baseArchivo: baseArchivo }) => ({
        ...state,
        loading: true,
        loaded: false,
        previewFile: null,
        selectedTab: tipo,
        baseArchivo: baseArchivo,
        load: false,
        error: null,
        success: null,
    })),
    on(fromActions.previewFileSuccess, (state, { file }) => ({
        ...state,
        loading: false,
        loaded: true,
        previewFile: file
    })),
    on(fromActions.previewFileFail, (state, { mensaje }) => ({
        ...state,
        loading: false,
        error: mensaje
    })),

    on(fromActions.createFiles, (state, { baseArchivo: baseArchivo }) => ({
        ...state,
        writingFile: true,
        writenFile: false,
        // baseArchivo: baseArchivo,
        load: false,
        success: null,
        error: null,
    })),
    on(fromActions.createFilesSuccess, (state, { mensaje }) => ({
        ...state,
        writingFile: false,
        writenFile: true,
        success: mensaje
    })),
    on(fromActions.createFilesFail, (state, { mensaje }) => ({
        ...state,
        writingFile: false,
        error: mensaje
    })),


    on(fromActions.setBaseArchivo, (state, { baseArchivo }) => ({
        ...state,
        error: null,
        success: null,
        baseArchivo: baseArchivo,

    })),
    on(fromActions.updateBaseArchivo, (state) => ({
        ...state,
        error: null,
        success: null,
        updatingBaseArchivo: true,
    })),
    on(fromActions.updateBaseArchivoSuccess, (state) => ({
        ...state,
        error: null,
        success: null,
        updatingBaseArchivo: false,
    })),
    on(fromActions.closeSelectedFile, (state) => ({
        ...state,
        openFile: null
    })),
    on(fromActions.changeTab, (state, { tab }) => ({
        ...state,
        selectedTab: tab,
        error: null,
        success: null,
    })),
    on(fromActions.refreshFiles, (state) => ({
        ...state,
        error: null,
        success: null,
    })),

);

export function lecturaReducer(state: ArchivoState | undefined, action: Action) {
    return _archivoReducer(state, action);
}