import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';

export enum codigo {
  FILE_OPEN, ENTIDAD, CONTROLADOR, SERVICIO, REPOSITORIO
}



@Component({
  selector: 'app-inicio-index',
  templateUrl: './inicio-index.component.html',
  styleUrls: ['./inicio-index.component.css']
})
export class InicioIndexComponent implements OnInit, OnDestroy {

  public code = "";
  public selectedView = codigo.ENTIDAD;

  public fileOpen: ArchivoModel = null;

  private _subscriptionLectura: Subscription;

  codeMirrorOptions: any = {
    theme: 'darcula',
    mode: 'text/x-java',
    lineNumbers: true,
    lineWrapping: true,
    rtlMoveVisually: true,
    fixedGutter: false,
    readOnly: 'nocursor',
    // scrollbarStyle: '',
  };


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnDestroy() {
    this._subscriptionLectura.unsubscribe();
  }

  ngOnInit(): void {
    this._subscriptionLectura = this.store.select('lectura').subscribe(state => {
      if (state.file != null && state.file != this.fileOpen) {
        this.selectedView = codigo.FILE_OPEN;
        this.code = state.file.contenido;
      }
      this.fileOpen = state.file;
    });
  }


  codeViewClick(selected: string) {
    this.code = "";
    switch (selected) {
      case 'FILE_OPEN':
        this.selectedView = codigo.FILE_OPEN;
        this.code = this.fileOpen.contenido;
        console.log(this.code);

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



}

