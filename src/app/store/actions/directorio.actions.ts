import { createAction, props } from '@ngrx/store';
import { DirectorioModel } from 'src/app/commons/models/directorio.model';

export const setDirectorioBase = createAction(
    '[DIRECTORIO] Set directorio base',
    props<{ dir: DirectorioModel }>()
);
