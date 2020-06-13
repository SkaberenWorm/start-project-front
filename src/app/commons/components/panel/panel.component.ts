import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tabs } from 'src/app/commons/components/editor/editor.component';
import {
  createFiles,
  previewFile,
  updateBaseArchivo,
  updateBaseArchivoSuccess,
} from 'src/app/store/actions/archivo.actions';
import { AppState } from 'src/app/store/app.reducer';

import { AtributoModel } from '../../models/atributo.model';
import { BaseArchivoModel } from '../../models/base-archivo.model';
import { DirectorioModel } from '../../models/directorio.model';
import { Util } from '../../util/util';
import { UtilAlert } from '../../util/util-alert';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  private _subscriptionDirectorio: Subscription;
  private _subscriptionEnviroment: Subscription;

  public pathValido = false;

  public directorioBase: DirectorioModel = new DirectorioModel();
  public entidadName = null;
  public atributos: Array<AtributoModel> = [];

  private selectedTab = tabs.ENTIDAD;
  private baseArchivo = new BaseArchivoModel();


  constructor(
    private store: Store<AppState>,
    private alert: UtilAlert
  ) { }


  formularioEntidad: FormGroup;
  formularioAtributo: FormGroup;
  ngOnInit(): void {
    this.formularioEntidad = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
    });

    this.formularioAtributo = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
      variable: new FormControl('', [Validators.required]),
      primaryKey: new FormControl(''),
    });

    this._subscriptionDirectorio = this.store.select('directorio').subscribe(state => {
      if (state.directorioBase != null && state.directorioBase.path != this.directorioBase.path) {
        this.directorioBase = state.directorioBase;
      }
    });

    this._subscriptionEnviroment = this.store.select('archivo').subscribe(state => {
      this.selectedTab = state.selectedTab;
      if (state.updatingBaseArchivo) {
        this.setBaseArchivo();
        this.store.dispatch(updateBaseArchivoSuccess({ baseArchivo: this.baseArchivo }));
        this.store.dispatch(previewFile({ tipo: this.selectedTab, baseArchivo: this.baseArchivo }));
      }
    });
  }

  crearArchivos() {
    this.setBaseArchivo();
    if (this.directorioBase.pathValid) {
      this.store.dispatch(createFiles({ baseArchivo: this.baseArchivo }));
    } else {
      this.alert.errorSwal('Debe estar en el package principal del proyecto');
    }
  }

  setBaseArchivo() {

    this.baseArchivo.nombreClase = this.entidadName;
    this.baseArchivo.packageBase = this.directorioBase.packageBase;
    this.baseArchivo.pathDirectorioBase = this.directorioBase.path;
    this.baseArchivo.atributos = this.atributos;

    switch (this.selectedTab) {
      case tabs.ENTIDAD:
        this.baseArchivo.packageArchivo = `${this.directorioBase.packageBase}.entities`;
        this.baseArchivo.pathArchivo = `${this.directorioBase.path}/entities/${this.baseArchivo.nombreClase}.java`;
        break;
      case tabs.CONTROLADOR:
        this.baseArchivo.packageArchivo = `${this.directorioBase.packageBase}.controllers`;
        this.baseArchivo.pathArchivo = `${this.directorioBase.path}/controllers/${this.baseArchivo.nombreClase}.java`;
        break;
      case tabs.SERVICIO:
        this.baseArchivo.packageArchivo = `${this.directorioBase.packageBase}.services`;
        this.baseArchivo.pathArchivo = `${this.directorioBase.path}/services/${this.baseArchivo.nombreClase}.java`;
        break;
      case tabs.SERVICIO_IMPL:
        this.baseArchivo.packageArchivo = `${this.directorioBase.packageBase}.services.impl`;
        this.baseArchivo.pathArchivo = `${this.directorioBase.path}/services.impl/${this.baseArchivo.nombreClase}.java`;
        break;
      case tabs.REPOSITORIO:
        this.baseArchivo.packageArchivo = `${this.directorioBase.packageBase}.repositories`;
        this.baseArchivo.pathArchivo = `${this.directorioBase.path}/repositories/${this.baseArchivo.nombreClase}.java`;
        break;
    }

  }

  ngOnDestroy() {
    this._subscriptionDirectorio.unsubscribe();
    this._subscriptionEnviroment.unsubscribe();
  }

  previewCode(nombreEntidad: string) {
    this.entidadName = nombreEntidad.trim();
    const isDiferent = nombreEntidad != this.baseArchivo.nombreClase;
    if (isDiferent) {
      this.store.dispatch(updateBaseArchivo());
    }
  }

  addAtributo() {
    Util.setFormForValidate(this.formularioAtributo);
    if (this.formularioAtributo.valid) {
      const tipo = this.formularioAtributo.controls.tipo.value.trim();
      const variable = this.formularioAtributo.controls.variable.value.trim();
      let primaryKey = false;
      if (this.formularioAtributo.controls.primaryKey.value) {
        primaryKey = true;
      }
      this.atributos.push(new AtributoModel({ tipo: tipo, variable: variable, primaryKey: primaryKey }));
      this.formularioAtributo.reset();
      this.store.dispatch(updateBaseArchivo());
    }
  }
}
