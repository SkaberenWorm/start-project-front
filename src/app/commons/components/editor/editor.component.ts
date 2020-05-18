import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArchivoModel } from '../../models/archivo.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { setOpenCode } from 'src/app/store/actions/environment.actions';
import { setOpenFile } from 'src/app/store/actions/lectura.actions';


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
  public filePreview: ArchivoModel = null;

  private _subscriptionLectura: Subscription;
  private _subscriptionEnviroment: Subscription;


  private mode = '';
  public codeMirrorOptions: any = {};
  public isSaved = true;
  public esPreview = true;


  constructor(
    private store: Store<AppState>,
    // private configService: ConfigService,
    // private actionService: ActionService,
  ) { }

  ngOnDestroy() {
    this._subscriptionLectura.unsubscribe();
    this._subscriptionEnviroment.unsubscribe();
  }

  ngOnInit(): void {
    // this.store.dispatch(setOpenCode({ openCode: codigo.ENTIDAD }));
    // console.warn('this.store.dispatch(setOpenCode({ openCode: codigo.ENTIDAD }));');
    this.setCodeMirrorOptions();

    this._subscriptionEnviroment = this.store.select('environment').subscribe(state => {
      // Lo seteamos solo cuando es un archivo abierto, ya que los preview los consultamos desde el Panel
      if (state.openCode == codigo.FILE_OPEN) {
        this.selectedView = state.openCode;
        // this.code = "";
      }
    });

    this._subscriptionLectura = this.store.select('lectura').subscribe(state => {

      this.code = "";

      if (state.previewFile != null) {
        this.esPreview = true;
        this.setMode(state.previewFile.nombre);
        this.filePreview = state.previewFile;
        if (this.selectedView != codigo.FILE_OPEN) {
          this.filePreview.nombre == '' ? this.code = "" : this.code = this.filePreview.contenido;
        }
      }

      if (state.openFile != null) {
        this.esPreview = false;
        this.setMode(state.openFile.nombre);
        this.fileOpen = state.openFile;
        console.log(this.selectedView);
        if (this.selectedView == codigo.FILE_OPEN) {
          this.fileOpen.nombre == '' ? this.code = "" : this.code = this.fileOpen.contenido;
        }
        // this.selectedView == codigo.FILE_OPEN
      }



      console.log(state);

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
    if (!this.esPreview) {
      this.isSaved = true;
      this.fileOpen.contenido = this.codeEdited;
      this.store.dispatch(setOpenFile({ file: this.fileOpen }));
      console.warn('this.store.dispatch(setOpenFile({ file: this.fileOpen }));');
      console.log('save');
    }
  }

  /**
   * Setea el código a ver (Entidad, repositorio, etc.)
   * @param selected 
   */
  codeViewClick(selected: string) {
    // this.code = "";
    this.selectedView = this.textToEnum(selected);
    this.store.dispatch(setOpenCode({ openCode: this.selectedView }));
    console.warn('this.store.dispatch(setOpenCode({ openCode: selected }));');

  }

  /**
   * 
   * @param selected 
   */
  isView(selected: string) {
    console.log(selected);
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
    this.store.dispatch(setOpenFile({ file: null }));
    console.log('this.store.dispatch(setOpenFile({ file: null }));');
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
        return codigo.FILE_OPEN;
      case 'ENTIDAD':
        return codigo.ENTIDAD;
      case 'CONTROLADOR':
        return codigo.CONTROLADOR;
      case 'SERVICIO':
        return codigo.SERVICIO;
      case 'REPOSITORIO':
        return codigo.REPOSITORIO;
      default:
        return codigo.ENTIDAD;
    }
  }

}
