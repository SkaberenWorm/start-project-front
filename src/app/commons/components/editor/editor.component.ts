import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArchivoModel } from '../../models/archivo.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { closeSelectedFile, changeTab, previewFile, updateBaseArchivo } from 'src/app/store/actions/archivo.actions';
import { BaseArchivoModel } from '../../models/base-archivo.model';
import { UtilAlert } from '../../util/util-alert';


export enum tabs {
  FILE_OPEN, ENTIDAD, CONTROLADOR, SERVICIO, REPOSITORIO, SERVICIO_IMPL
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  public code = "";
  public codeEdited = "";
  public selectedTab = tabs.ENTIDAD;

  public fileOpen: ArchivoModel = null;
  public filePreview: ArchivoModel = null;

  private _subscriptionArchivo: Subscription;
  private _subscriptionDirectorio: Subscription;


  private mode = '';
  public codeMirrorOptions: any = {};
  public isSaved = true;
  public esPreview = true;

  private baseArchivo: BaseArchivoModel = new BaseArchivoModel();

  private isPackageValid = false;


  constructor(
    private store: Store<AppState>,
    private alert: UtilAlert
  ) { }

  ngOnDestroy() {
    this._subscriptionDirectorio.unsubscribe();
    this._subscriptionArchivo.unsubscribe();
  }

  ngOnInit(): void {
    this.setCodeMirrorOptions();

    this._subscriptionDirectorio = this.store.select('directorio').subscribe(state => {
      if (state.directorioBase != null && state.directorioBase.packageBase != null) {
        this.isPackageValid = state.directorioBase.pathValid;
        this.baseArchivo.packageBase = state.directorioBase.packageBase;
      }
      if (!this.isPackageValid) {
        this.setMode("java");
        this.code = "Debe estar dentro del package principal de la aplicación";
      } else {
        this.code = "";
      }
    });

    this._subscriptionArchivo = this.store.select('archivo').subscribe(state => {
      if (state.baseArchivo != null) {
        this.baseArchivo = state.baseArchivo;
      }
      if (state.selectedTab != null) {
        this.selectedTab = state.selectedTab;
      }

      if (state.selectedTab == tabs.FILE_OPEN && state.openFile != null) {
        this.setMode(state.openFile.nombre);
        this.fileOpen = state.openFile;
        this.code = this.fileOpen.contenido
      } else if (state.selectedTab == tabs.FILE_OPEN && state.openFile == null) {
        this.fileOpen = null;
      }

      if (state.loaded && state.selectedTab != tabs.FILE_OPEN && state.previewFile != null) {
        this.setMode(state.previewFile.nombre);
        this.filePreview = state.previewFile;
        this.code = this.filePreview.contenido
      } else if (!state.loading && !state.loaded && state.error != null) {
        this.code = 'Problemas al intentar mostrar el código';
      }

      if (!state.writingFile && state.writenFile && state.success != null) {
        this.alert.successSwal(state.success);
      }

      if (!state.writingFile && !state.writenFile && state.error != null) {
        this.alert.errorSwal(state.error);
      }
    });
  }


  setMode(fileName: string) {
    let extension = fileName;
    Array.from(Array(5)).forEach(() => {
      extension = extension.substring(extension.indexOf('.'), extension.length);
    });
    extension = extension.replace('.', '');
    switch (extension) {
      case 'java':
        this.mode = 'text/x-java';
        break;
      case 'json':
        this.mode = 'application/ld+json';
        break;
      case 'ts':
        this.mode = 'text/typescript';
        break;
      case 'css':
        this.mode = 'text/css';
        break;
      case 'scss':
        this.mode = 'text/x-scss';
        break;
      case 'less':
        this.mode = 'text/x-less';
        break;
      case 'html':
        this.mode = 'text/html';
      case 'sql':
        // text/x-plsql
        // text/x-sql
        // text/x-sqlite
        this.mode = 'text/x-mssql';
        break;
      case 'md':
        this.mode = 'text/x-gfm';
        break;
      default:
        this.mode = 'text/x-java';
        break;
    }
    this.setCodeMirrorOptions();
  }

  /**
   * Actualizamos las opciones para que tome el mode
   */
  setCodeMirrorOptions() {
    this.codeMirrorOptions = {
      foldGutter: true,
      theme: 'darcula',
      mode: this.mode,
      lineNumbers: true,
      lineWrapping: false, // Solo una linea
      rtlMoveVisually: true,
      // fixedGutter: false, // Agrega el icono para enrollar
      // readOnly: 'nocursor', // Evita que se edite
      matchBrackets: true,
      // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      autoCloseBrackets: true,
      lint: true,
      extraKeys: {
        "Esc": () => this.closeCode(),
        "Ctrl-S": () => this.saveCode(),
        "Cmd-S": () => this.saveCode(),
      }
    };
  }


  saveCode() {
    if (!this.esPreview) {
      this.isSaved = true;
      // this.fileOpen.contenido = this.codeEdited;
      // this.store.dispatch(setOpenFile({ file: this.fileOpen }));
      // console.warn('this.store.dispatch(setOpenFile({ file: this.fileOpen }));');
      console.log('save');
    }
  }

  /**
   * Setea el código a ver (Entidad, repositorio, etc.)
   * @param selected 
   */
  codeViewClick(selected: string) {
    if (this.isPackageValid) {
      // this.code = "";
      this.selectedTab = this.textToEnum(selected);
      this.store.dispatch(changeTab({ tab: this.selectedTab }));
      if (this.selectedTab != tabs.FILE_OPEN) {
        this.store.dispatch(updateBaseArchivo());
        this.store.dispatch(previewFile({ tipo: this.selectedTab, baseArchivo: this.baseArchivo }));
      }
    }
  }

  /**
   * 
   * @param selected 
   */
  isView(selected: string) {
    switch (selected) {
      case 'FILE_OPEN':
        return this.selectedTab == tabs.FILE_OPEN;
      case 'ENTIDAD':
        return this.selectedTab == tabs.ENTIDAD;
      case 'CONTROLADOR':
        return this.selectedTab == tabs.CONTROLADOR;
      case 'SERVICIO':
        return this.selectedTab == tabs.SERVICIO;
      case 'SERVICIO_IMPL':
        return this.selectedTab == tabs.SERVICIO_IMPL;
      case 'REPOSITORIO':
        return this.selectedTab == tabs.REPOSITORIO;
      default:
        return false;
    }
  }

  /**
   * Cierra la pestaña del archivo seleccionado (tabs.FILE_OPEN)
   */
  closeCode(): void {
    this.store.dispatch(closeSelectedFile());
  }

  setEditorContent(codigo: string) {
    console.log(codigo);
    this.codeEdited = codigo;
    if (this.fileOpen != null) {
      if (codigo != this.fileOpen.contenido) {
        this.isSaved = false;
      } else {
        this.isSaved = true;
      }
    }
  }

  textToEnum(selected: string) {
    switch (selected) {
      case 'FILE_OPEN':
        return tabs.FILE_OPEN;
      case 'ENTIDAD':
        return tabs.ENTIDAD;
      case 'CONTROLADOR':
        return tabs.CONTROLADOR;
      case 'SERVICIO':
        return tabs.SERVICIO;
      case 'SERVICIO_IMPL':
        return tabs.SERVICIO_IMPL;
      case 'REPOSITORIO':
        return tabs.REPOSITORIO;
      default:
        return tabs.ENTIDAD;
    }
  }

}
