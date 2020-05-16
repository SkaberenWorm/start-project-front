import { createAction, props } from '@ngrx/store';
import { DirectorioModel } from 'src/app/commons/models/directorio.model';

export const setCurrentDirectory = createAction(
    '[DIRECTORIO] Set current directory',
    props<{ dir: DirectorioModel }>()
);
