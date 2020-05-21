import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ActionService } from '../../services/action.service';
import { BaseArchivoModel } from '../../models/base-archivo.model';
import { AtributoModel } from '../../models/atributo.model';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilAlert } from '../../util/util-alert';
import { setBaseArchivo } from 'src/app/store/actions/archivo.actions';
import { DirectorioModel } from '../../models/directorio.model';
import { tabs } from 'src/app/commons/components/editor/editor.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  private _subscriptionDirectorio: Subscription;
  private _subscriptionEnviroment: Subscription;

  // public directorioActual: DirectorioModel = null;

  public pathValido = false;

  public directorioBase: DirectorioModel = new DirectorioModel();
  public entidadName = null;

  private selectedTab = tabs.ENTIDAD;
  private baseArchivo = new BaseArchivoModel();


  constructor(
    private store: Store<AppState>,
    private actionsServices: ActionService,
    private alert: UtilAlert
  ) { }


  formularioEntidad: FormGroup;
  ngOnInit(): void {
    this.formularioEntidad = new FormGroup({
      nombre: new FormControl(),
    });

    this._subscriptionDirectorio = this.store.select('directorio').subscribe(state => {
      if (state.directorioBase != null && state.directorioBase.path != this.directorioBase.path) {
        this.directorioBase = state.directorioBase;
      }
    });

    this._subscriptionEnviroment = this.store.select('archivo').subscribe(state => {
      this.selectedTab = state.selectedTab;
    });
  }


  crearArchivos() {
    this.setBaseArchivo();
    this.actionsServices.crearEntidad(this.baseArchivo).subscribe(result => {
      if (!result.error) {

      } else {
        this.alert.errorSwalTopRight(result.mensaje);
      }
    });

  }

  setBaseArchivo() {
    let atributos = new Array<AtributoModel>();
    atributos.push(new AtributoModel({ tipo: 'int', variable: 'id', primaryKey: true }));
    atributos.push(new AtributoModel({ tipo: 'String', variable: 'descripcion', primaryKey: false }));
    atributos.push(new AtributoModel({ tipo: 'List<Imagen>', variable: 'imagenes', primaryKey: false }));
    atributos.push(new AtributoModel({ tipo: 'Categoria', variable: 'categoria', primaryKey: false }));
    atributos.push(new AtributoModel({ tipo: 'double', variable: 'activo', primaryKey: false }));
    this.baseArchivo.nombreClase = this.entidadName;
    this.baseArchivo.packageArchivo = `${this.directorioBase.packageBase}.entities`;
    this.baseArchivo.packageBase = this.directorioBase.packageBase;
    this.baseArchivo.atributos = atributos;
    this.baseArchivo.pathArchivo = `${this.directorioBase.path}/entities/${this.baseArchivo.nombreClase}.java`;
  }


  ngOnDestroy() {
    this._subscriptionDirectorio.unsubscribe();
    this._subscriptionEnviroment.unsubscribe();
  }

  previewCode(nombreEntidad: string) {
    const baseArchivo: BaseArchivoModel = Object.assign({}, this.baseArchivo);;
    this.entidadName = nombreEntidad;
    this.setBaseArchivo();
    const isDiferent = baseArchivo.nombreClase != this.baseArchivo.nombreClase;
    if (isDiferent) {
      this.store.dispatch(setBaseArchivo({ baseArchivo: this.baseArchivo }));
      console.warn('setBaseArchivo');
      this.actionsServices.previewCode(this.selectedTab, this.baseArchivo);
    }

  }

}
