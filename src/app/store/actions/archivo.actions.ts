import { createAction, props } from '@ngrx/store';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';
import { BaseArchivoModel } from 'src/app/commons/models/base-archivo.model';

export const readSelectedFile = createAction(
    '[ARCHIVO] Read selected file',
    props<{ pathFile: string }>()
);

export const readSelectedFileSuccess = createAction(
    '[ARCHIVO] Read selected file success',
    props<{ file: ArchivoModel }>()
);

export const readSelectedFileFail = createAction(
    '[ARCHIVO] Read selected file fail',
    props<{ mensaje: string }>()
);

export const previewFile = createAction(
    '[ARCHIVO] Show preview',
    props<{ tipo: number, baseArchivo: BaseArchivoModel }>()
);

export const previewFileSuccess = createAction(
    '[ARCHIVO] Show preview success',
    props<{ file: ArchivoModel }>()
);

export const previewFileFail = createAction(
    '[ARCHIVO] Show preview fail',
    props<{ mensaje: string }>()
);

export const setBaseArchivo = createAction(
    '[ARCHIVO] Set base archivo',
    props<{ baseArchivo: BaseArchivoModel }>()
);

export const updateBaseArchivo = createAction('[ARCHIVO] Update base archivo');

export const updateBaseArchivoSuccess = createAction(
    '[ARCHIVO] Update base archivo success',
    props<{ baseArchivo: BaseArchivoModel }>()
);

export const changeTab = createAction(
    '[ARCHIVO] Change tab',
    props<{ tab: number }>()
);



export const closeSelectedFile = createAction('[ARCHIVO] Close selected file');

export const refreshFiles = createAction('[ARCHIVO] Refresh files');

