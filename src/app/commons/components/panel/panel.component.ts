import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DirectorioModel } from '../../models/directorio.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { setPackageBase, setEntityName } from 'src/app/store/actions/environment.actions';
import { ActionService } from '../../services/action.service';
import { BaseArchivoModel } from '../../models/base-archivo.model';
import { AtributoModel } from '../../models/atributo.model';
import { FormGroup, FormControl } from '@angular/forms';
import { UtilAlert } from '../../util/util-alert';
import { codigo } from '../editor/editor.component';
import { refreshFiles } from 'src/app/store/actions/lectura.actions';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  private _subscriptionDirectorio: Subscription;
  private _subscriptionEnviroment: Subscription;

  public directorioActual: DirectorioModel = null;

  public pathValido = false;

  private pathBase = null;
  public packageBase = null;
  public entidadName = null;

  private openCode = null;
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
      if (state.dir != null) {
        this.directorioActual = state.dir;
        if (this.isPathValido()) {
          this.store.dispatch(setPackageBase({ packageBase: this.pathToPackage(state.dir.path) }));
          console.warn('this.store.dispatch(setPackageBase({ packageBase: this.pathToPackage(state.dir.path) }));');
        } else {
          this.store.dispatch(setPackageBase({ packageBase: 'No se ha encontrado el package' }));
          console.warn('dispatch(setPackageBase(');
        }
      }
    });

    this._subscriptionEnviroment = this.store.select('environment').subscribe(state => {
      this.packageBase = state.packageBase;
      this.entidadName = state.entityName;
      this.pathBase = state.pathBase;

      /**
       * Traemos el código corresponsiende, dependiendo de la pesaña seleccionada
       */
      if (state.openCode != null && state.entityName != null && state.pathBase != null && state.pathBase != null) {
        if (this.openCode != state.openCode) {
          this.openCode = state.openCode;
          if (state.openCode != codigo.FILE_OPEN) {
            this.previewCode(this.entidadName);
            console.log('Preview Code');
          } else {
            /** 
             * Refresca la lectura porque solo se produce una cambio en el estado cuando se cambia entre pestañas de 
             * los preview 
             */
            this.store.dispatch(refreshFiles());
          }
        }
      }


      /**
       * Refrescamos el estado de la lectura, para que en el componente editor valide si el nombre de la entidad es null y 
       * así borrar el código que se haya seteado anteriormente.
       */
      if (state.entityName == null && this.openCode != state.openCode) {
        this.store.dispatch(refreshFiles());
      }
      this.openCode = state.openCode;
      console.log(state)
    });
  }


  private pathToPackage(path: string): string {
    path = path.substring(path.indexOf('src/main/java/'), path.length);
    path = path.replace('src/main/java/', '');
    if (path.indexOf('/repositories') != -1) {
      path = path.substring(0, path.indexOf('/repositories'));
    }
    if (path.indexOf('/controllers') != -1) {
      path = path.substring(0, path.indexOf('/controllers'));
    }
    if (path.indexOf('/services') != -1) {
      path = path.substring(0, path.indexOf('/services'));
    }
    if (path.indexOf('/entities') != -1) {
      path = path.substring(0, path.indexOf('/entities'));
    }
    if (path.indexOf('/utils') != -1) {
      path = path.substring(0, path.indexOf('/utils'));
    }
    Array.from(Array(10)).forEach(() => {
      path = path.replace('/', '.');
    });
    return path;
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
    this.baseArchivo.packageArchivo = `${this.packageBase}.entities`;
    this.baseArchivo.packageBase = this.packageBase;
    this.baseArchivo.atributos = atributos;
    this.baseArchivo.pathArchivo = `${this.pathBase}/entities/${this.baseArchivo.nombreClase}.java`;
  }

  isPathValido(): boolean {
    this.pathValido = false;
    let path = !!this.directorioActual ? this.directorioActual.path : '';
    if (path.indexOf('src/main/java/') == -1) {
      this.pathValido = false;
      return this.pathValido;
    }

    if (this.directorioActual.directorios != null && this.directorioActual.directorios.length > 0) {

      var isReposiroty = false;
      let isEntity = false;
      let isController = false;
      let isService = false;
      let isImplService = false;

      for (let index = 2; index < this.directorioActual.directorios.length; index++) {
        const directorio = this.directorioActual.directorios[index];
        if (directorio.esFile) {
          continue;
        }
        if (directorio.path.indexOf('repositories') != -1) {
          isReposiroty = true;
        }
        if (directorio.path.indexOf('entities') != -1) {
          isEntity = true;
        }
        if (directorio.path.indexOf('controllers') != -1) {
          isController = true;
        }
        if (directorio.path.indexOf('services') != -1) {
          isService = true;
          for (let index = 2; index < directorio.directorios.length; index++) {
            const dir = directorio.directorios[index];
            if (dir.path.indexOf('services/impl') != -1 && !dir.esFile) {
              isImplService = true;
            }
          }
        }
      }

      // console.log('______________________________');
      // console.log('Reposiroty: ' + isReposiroty);
      // console.log('Entity: ' + isEntity);
      // console.log('Controller: ' + isController);
      // console.log('Service: ' + isService);
      // console.log('Impl Service: ' + isImplService);
      if (isReposiroty && isEntity && isController && isService) {
        this.pathValido = true;
        return this.pathValido;
      }
    } else {
      this.pathValido = false;
      return this.pathValido;
    }
  }

  ngOnDestroy() {
    this._subscriptionDirectorio.unsubscribe();
    this._subscriptionEnviroment.unsubscribe();
  }

  previewCode(nombreEntidad: string) {
    if (this.entidadName != nombreEntidad) {
      this.store.dispatch(setEntityName({ name: nombreEntidad }));
      console.warn('this.store.dispatch(setEntityName({ name: nombreEntidad }));');
    }
    this.entidadName = nombreEntidad;
    this.setBaseArchivo();
    this.actionsServices.previewCode(this.openCode, this.baseArchivo);
  }

}
