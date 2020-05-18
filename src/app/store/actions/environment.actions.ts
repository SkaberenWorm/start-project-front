import { createAction, props } from '@ngrx/store';

export const setEntityName = createAction(
    '[ENVIROMENT] Set entity name',
    props<{ name: string }>()
);
export const setPackageBase = createAction(
    '[ENVIROMENT] Set package base',
    props<{ packageBase: string }>()
);

export const setPathBase = createAction(
    '[ENVIROMENT] Set path base',
    props<{ pathBase: string }>()
);

export const setOpenCode = createAction(
    '[ENVIROMENT] Set code open',
    props<{ openCode: number }>()
);



export const unsetEnviroment = createAction('[ENVIROMENT] Unset enviroment');
