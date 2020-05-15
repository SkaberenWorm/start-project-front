import { createAction, props } from '@ngrx/store';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';


export const openFile = createAction(
    '[LECTURA] Open file',
    props<{ filePath: string }>()
);

export const setFileOpen = createAction(
    '[LECTURA] Set file open',
    props<{ file: ArchivoModel }>()
);
