import { createAction, props } from '@ngrx/store';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';


export const openFile = createAction(
    '[LECTURA] Open file',
    props<{ filePath: string }>()
);

export const setOpenFile = createAction(
    '[LECTURA] Set open file',
    props<{ file: ArchivoModel }>()
);

export const setPreviewFile = createAction(
    '[LECTURA] Set preview file',
    props<{ file: ArchivoModel }>()
);

export const refreshFiles = createAction('[LECTURA] Refresh files');



