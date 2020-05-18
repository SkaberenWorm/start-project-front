import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseArchivoModel } from '../models/base-archivo.model';
import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { ArchivoModel } from '../models/archivo.model';
import { codigo } from '../components/editor/editor.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UtilAlert } from '../util/util-alert';
import { setPreviewFile } from 'src/app/store/actions/lectura.actions';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private urlBase = `${environment.backend_url}api/action`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  private _subscription$: Subscription;
  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
    private alert: UtilAlert
  ) { }

  /*----------- ENTIDADES -----------*/
  public crearEntidad(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/create-entity`, baseArchivo, { headers: this.headers });
  }
  private vistaPreviaEntidad(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/ver-entity-vista-previa`, baseArchivo, { headers: this.headers });
  }

  /*----------- PREVIEW CODE -----------*/
  public previewCode(codeOpen: number, baseArchivo: BaseArchivoModel) {
    switch (codeOpen) {
      case codigo.ENTIDAD:

        this._subscription$ = this.vistaPreviaEntidad(baseArchivo).subscribe(
          result => {
            !result.error ? this.store.dispatch(setPreviewFile({ file: result.salida })) : this.alert.errorSwalTopRight(result.mensaje)
            this._subscription$.unsubscribe();
            console.warn('this.store.dispatch(setPreviewFile({ file: result.salida })');
          }
        );
        break;
      case codigo.SERVICIO:
        this.store.dispatch(setPreviewFile({ file: null }))
        console.warn('this.store.dispatch(setPreviewFile({ file: null }))');
        break;
      case codigo.REPOSITORIO:
        this.store.dispatch(setPreviewFile({ file: null }))
        console.warn('this.store.dispatch(setPreviewFile({ file: null }))');
        break;
      case codigo.CONTROLADOR:
        this.store.dispatch(setPreviewFile({ file: null }))
        console.warn('this.store.dispatch(setPreviewFile({ file: null }))');
        break;
    }
  }



}
