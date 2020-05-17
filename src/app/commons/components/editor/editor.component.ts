import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArchivoModel } from '../../models/archivo.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ConfigService } from '../../services/config.service';
import { setFileOpen } from 'src/app/store/actions/lectura.actions';


export enum codigo {
  FILE_OPEN, ENTIDAD, CONTROLADOR, SERVICIO, REPOSITORIO
}


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  public code = "";
  public codeEdited = "";
  public selectedView = codigo.ENTIDAD;

  public fileOpen: ArchivoModel = null;

  private _subscription: Subscription;


  private mode = '';

  public codeMirrorOptions: any = {};

  public isSaved = true;





  constructor(
    private store: Store<AppState>,
    private config: ConfigService
  ) { }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setCodeMirrorOptions();

    this._subscription = this.store.select('lectura').subscribe(state => {

      if (state.file != null && state.file != this.fileOpen) {
        this.selectedView = codigo.FILE_OPEN;
        this.code = state.file.contenido;
      }

      this.fileOpen = state.file;

      if (this.fileOpen != null) {
        this.setMode(state.file.nombre);
      }

    });

  }

  setMode(fileName: string) {
    let extension = fileName;
    Array.from(Array(5)).forEach(i => {
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
    // console.log(this.mode);
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
    this.isSaved = true;
    this.fileOpen.contenido = this.codeEdited;
    this.store.dispatch(setFileOpen({ file: this.fileOpen }));
    console.log('save');
  }

  codeViewClick(selected: string) {
    this.code = "";
    switch (selected) {
      case 'FILE_OPEN':
        this.selectedView = codigo.FILE_OPEN;
        this.code = this.fileOpen.contenido;
        break;
      case 'ENTIDAD':
        this.selectedView = codigo.ENTIDAD;
        break;
      case 'CONTROLADOR':
        this.selectedView = codigo.CONTROLADOR;
        break;
      case 'SERVICIO':
        this.selectedView = codigo.SERVICIO;
        break;
      case 'REPOSITORIO':
        this.selectedView = codigo.REPOSITORIO;
        break;
      default:
        this.selectedView = codigo.ENTIDAD;
        break;
    }
  }

  isView(selected: string) {
    switch (selected) {
      case 'FILE_OPEN':
        return this.selectedView == codigo.FILE_OPEN;
      case 'ENTIDAD':
        return this.selectedView == codigo.ENTIDAD;
      case 'CONTROLADOR':
        return this.selectedView == codigo.CONTROLADOR;
      case 'SERVICIO':
        return this.selectedView == codigo.SERVICIO;
      case 'REPOSITORIO':
        return this.selectedView == codigo.REPOSITORIO;
      default:
        return false;
    }
  }

  closeCode(): void {
    this.code = "";
    this.fileOpen = null;
    this.store.dispatch(setFileOpen({ file: null }));
  }

  setEditorContent(codigo: string) {
    console.log(codigo);
    this.codeEdited = codigo;
    if (codigo != this.fileOpen.contenido) {
      this.isSaved = false;
    } else {
      this.isSaved = true;
    }
  }

}
