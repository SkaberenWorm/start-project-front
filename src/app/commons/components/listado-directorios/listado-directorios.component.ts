import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { readSelectedFile } from 'src/app/store/actions/archivo.actions';
import { setDirectorioBase } from 'src/app/store/actions/directorio.actions';
import { AppState } from 'src/app/store/app.reducer';

import { DirectorioModel } from '../../models/directorio.model';
import { DirectorioService } from '../../services/directorio.service';


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  path: string;
  level: number;
  isFile: boolean;
  isSelectedFile: boolean;
}

@Component({
  selector: 'app-listado-directorios',
  templateUrl: './listado-directorios.component.html',
  styleUrls: ['./listado-directorios.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListadoDirectoriosComponent implements OnInit, OnDestroy {

  public directorios: Array<DirectorioModel> = [];
  private directoriosDesplegados: Array<string> = [];

  public height = 0;

  private nodeSelected: ExampleFlatNode;
  private _subscription: Subscription;

  private path = "";
  public dirBack: DirectorioModel = new DirectorioModel();
  public dirActual: DirectorioModel = new DirectorioModel();

  panelOpenState = true;

  private _transformer = (node: DirectorioModel, level: number) => {
    return {
      expandable: !!node.directorios && node.directorios.length > 0,
      name: node.nombre,
      level: level,
      path: node.path,
      isFile: node.esFile,
      isSelectedFile: false
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.directorios);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  public localStorageLastPath = 'angular-last-path';

  constructor(
    private directorioService: DirectorioService,
    private store: Store<AppState>,
    private changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log("ngOnInit()");

    // Traemos el último path del localStorage
    if (localStorage.getItem(this.localStorageLastPath)) {
      this.path = atob(localStorage.getItem(this.localStorageLastPath));
    }

    this.cargarDirectorios();

    this._subscription = this.store.select('archivo').subscribe(state => {

      if (!state.writingFile && state.writenFile && (state.success != null || state.error != null)) {
        this.cargarDirectorios();
      }

      if (state.openFile == null) {
        this.unSelectedAllFiles();
      }
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  /**
   * Agrega a la lista de los directorios desplegados y vuelve a cargar la lista para que cargue los subdirectorios
   * @param path Path completo del directorio que desea desplegar
   */
  desplegar(path: string) {
    this.directoriosDesplegados.push(path);
    this.cargarDirectorios();
  }

  /**
   * Carga la lista de directorios y subdirectorios del path idicado
   */
  public cargarDirectorios() {
    this.directorioService.getDirectorios(this.path, this.directoriosDesplegados).subscribe(result => {
      this.directorios = result;
      if (this.dirActual.path !== this.directorios[1].path) {
        this.dirBack = this.directorios[0];
        this.dirActual = this.directorios[1];
        localStorage.setItem(this.localStorageLastPath, btoa(this.dirActual.path));
        this.store.dispatch(setDirectorioBase({ dir: this.dirActual }));
      }

      // Quitamos los directerios de la lista (Directorio actual, directorio anterior)
      this.directorios.splice(0, 2);

      this.dataSource.data = this.directorios;
      this.desplegarLista();
      this.activarArchivoSeleccioado();
    });
  }

  /**
   * Despliega los directorios que estaban desplegados antes de cargar los subdirectorios
   */
  desplegarLista() {
    this.directoriosDesplegados.forEach(dir => {
      for (let index = 0; index < this.treeControl.dataNodes.length; index++) {
        const data = this.treeControl.dataNodes[index];
        if (data.path == dir) {
          this.treeControl.expand(data);
          break;
        }
      }
    });
  }

  /**
   * Activa el archivo seleccionado cuando se vuelve a cargar la lista
   */
  activarArchivoSeleccioado() {
    if (this.nodeSelected != null) {
      this.treeControl.dataNodes.forEach(node => {
        if (this.nodeSelected.path === node.path) {
          node.isSelectedFile = true;
        }
      });
    }
  }

  /**
   * Cierra los subdirectorios
   * @param path Path completo del directorio que desea cerrar
   */
  cerrar(path: string) {
    console.log('cerrar');
    for (let index = 0; index < this.directoriosDesplegados.length; index++) {
      const dir = this.directoriosDesplegados[index];
      if (dir == path) {
        this.directoriosDesplegados.splice(index, 1);
        break;
      }
    }
    this.cargarDirectorios();
  }

  /**
   * Setea un directorio como la raiz
   * @param path Path completo del directorio raiz
   */
  setPath(path: string) {
    this.path = path;
    this.directoriosDesplegados = [];
    this.cargarDirectorios();
  }

  /**
   * Retrocede un directorio
   */
  volver() {
    this.path = this.dirBack.path;
    this.desplegar(this.path);
  }

  /**
   * Muestra en el editor el archivo seleccionado
   * @param node Archivo seleccionado
   */
  verFile(node: ExampleFlatNode) {
    this.unSelectedAllFiles();
    node.isSelectedFile = true;
    this.nodeSelected = node;
    this.store.dispatch(readSelectedFile({ pathFile: node.path }));
    // this.lecturaService.leerFile(node.path).subscribe(result => {
    //   this.store.dispatch(setOpenCode({ openCode: codigo.FILE_OPEN }));
    //   this.store.dispatch(setOpenFile({ file: result }));
    //   console.warn('verFile() => setOpenCode');
    //   console.warn('verFile() => setOpenFile');
    // });
  }

  /**
   * Setea a false el atributo isSelectedFile de todos los archivos cargados
   */
  unSelectedAllFiles() {
    this.nodeSelected = null;
    if (this.treeControl.dataNodes != null) {
      this.treeControl.dataNodes.forEach(node => {
        node.isSelectedFile = false;
      });
    }
  }

  /**
   * Expande el directorio
   * @param node Directorio presionado
   */
  isExpanded(node: ExampleFlatNode) {
    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.expand(node);
    } else {
      this.treeControl.collapse(node);
    }
    return this.treeControl.isExpanded(node);
  }

  /**
   * Cierra todos los directorios despleagados
   */
  collapseAll() {
    this.treeControl.collapseAll();
    this.directoriosDesplegados = [];
  }


}
