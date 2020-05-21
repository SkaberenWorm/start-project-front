import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as archivoActions from '../actions/archivo.actions';
import { ActionService } from 'src/app/commons/services/action.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { tabs } from 'src/app/commons/components/editor/editor.component';

@Injectable()
export class ArchivoEffects {
    constructor(
        private actions$: Actions,
        private actionService: ActionService,
        private store: Store<AppState>
    ) { }


    readSelectedFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(archivoActions.readSelectedFile),
            exhaustMap(action =>
                this.actionService.leerFile(action.pathFile).pipe(
                    map(resul => {
                        if (resul['error']) {
                            return archivoActions.readSelectedFileFail({ mensaje: '' });
                        } else {
                            this.store.dispatch(archivoActions.changeTab({ tab: tabs.FILE_OPEN }));
                            return archivoActions.readSelectedFileSuccess({ file: resul });
                        }
                    }),
                    catchError(error => of(archivoActions.readSelectedFileFail({ mensaje: '' })))
                )
            )
        )
    );

    showPreview$ = createEffect(() =>
        this.actions$.pipe(
            ofType(archivoActions.previewFile),
            exhaustMap(action =>
                this.actionService.previewCode(action.tipo, action.baseArchivo).pipe(
                    map(resul => {
                        if (resul['error']) {
                            return archivoActions.previewFileFail({ mensaje: resul.mensaje });
                        } else {
                            return archivoActions.previewFileSuccess({ file: resul.salida });
                        }
                    }),
                    catchError(error => of(archivoActions.previewFileFail({ mensaje: '' })))
                )
            )

        )
    );

}