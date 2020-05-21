import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseArchivoModel } from '../models/base-archivo.model';
import { ResultadoProc } from '../interfaces/resultado-proc.interface';
import { ArchivoModel } from '../models/archivo.model';
import { tabs } from '../components/editor/editor.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UtilAlert } from '../util/util-alert';
import { previewFile, previewFileSuccess, previewFileFail } from 'src/app/store/actions/archivo.actions';
import { map } from 'rxjs/operators';

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

  /*==========  CREATE ==========*/
  public crearEntidad(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/create/entity`, baseArchivo, { headers: this.headers });
  }
  /*==========  END CREATE ==========*/




  /*==========  PREVIEW ==========*/

  /**
   * Muestra una vista previa del código que se insertará en el proyecto
   * @param baseArchivo
   */
  private vistaPreviaEntidad(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/preview/entity`, baseArchivo, { headers: this.headers });
  }
  private vistaPreviaControlador(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/preview/controlador`, baseArchivo, { headers: this.headers });
  }
  private vistaPreviaServicio(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/preview/servicio`, baseArchivo, { headers: this.headers });
  }
  private vistaPreviaServicioImpl(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/preview/servicio-impl`, baseArchivo, { headers: this.headers });
  }
  private vistaPreviaRepositorio(baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    return this.http.post<ResultadoProc<ArchivoModel>>(`${this.urlBase}/preview/repositorio`, baseArchivo, { headers: this.headers });
  }



  /**
   * Muestra la vista previa dependiendo de la pestana seleccionada.
   * 
   * Ejecuta vistaPreviaEntidad() cuando codeOpen = codigo.ENTIDAD
   * 
   * Ejecuta vistaPreviaServicio() cuando codeOpen = codigo.SERVICIO
   * 
   * Ejecuta vistaPreviaRepositorio() cuando codeOpen = codigo.REPOSITORIO
   * 
   * Ejecuta vistaPreviaControlador() cuando codeOpen = codigo.CONTROLADOR
   * 
   * @param codeOpen 
   * @param baseArchivo 
   */
  public previewCode(tab: number, baseArchivo: BaseArchivoModel): Observable<ResultadoProc<ArchivoModel>> {
    this.store.dispatch(previewFile({ tipo: tab, baseArchivo: baseArchivo }));
    switch (tab) {
      case tabs.ENTIDAD:
        return this.vistaPreviaEntidad(baseArchivo);
      case tabs.SERVICIO:
        return this.vistaPreviaServicio(baseArchivo);
      case tabs.REPOSITORIO:
        return this.vistaPreviaRepositorio(baseArchivo);
      case tabs.CONTROLADOR:
        return this.vistaPreviaControlador(baseArchivo);
      case tabs.SERVICIO_IMPL:
        return this.vistaPreviaServicioImpl(baseArchivo);
    }
  }
  /*==========  END PREVIEW ==========*/



  /*==========  READ ==========*/

  /**
   * Obtiene un archivo por su path
   * @param pathFile Path completo del archivo a leer
   */
  public leerFile(pathFile: string): Observable<ArchivoModel> {
    return this.http.get<ArchivoModel>(`${this.urlBase}/read/file?pathFile=${pathFile}`);
  }
  /*==========  END READ ==========*/








}
