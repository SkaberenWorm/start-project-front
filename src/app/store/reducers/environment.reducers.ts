import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/environment.actions';
import { Action } from '@ngrx/store';
import { codigo } from 'src/app/commons/components/editor/editor.component';

export interface EnviromentState {
    packageBase: string;
    pathBase: string,
    entityName: string;
    openCode: number;
}

export const initialState: EnviromentState = {
    packageBase: null,
    pathBase: null,
    entityName: null,
    openCode: codigo.ENTIDAD,
}
const _environmentReducer = createReducer(initialState,

    on(fromActions.setPackageBase, (state, { packageBase }) => ({
        ...state,
        packageBase: packageBase
    })),
    on(fromActions.setPathBase, (state, { pathBase }) => ({
        ...state,
        pathBase: pathBase
    })),
    on(fromActions.setEntityName, (state, { name }) => ({
        ...state,
        entityName: name
    })),
    on(fromActions.setOpenCode, (state, { openCode }) => ({
        ...state,
        openCode: openCode
    })),
    on(fromActions.unsetEnviroment, (state) => ({
        ...state,
    })),

);

export function environmentReducer(state: EnviromentState | undefined, action: Action) {
    return _environmentReducer(state, action);
}