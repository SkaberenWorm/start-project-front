import { Component, OnInit, OnDestroy } from '@angular/core';
import { DirectorioModel } from '../../models/directorio.model';
import { DirectorioService } from '../../services/directorio.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { LecturaService } from '../../services/lectura.service';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { setFileOpen } from 'src/app/store/actions/lectura.actions';


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  path: string;
  level: number;
}

@Component({
  selector: 'app-listado-directorios',
  templateUrl: './listado-directorios.component.html',
  styleUrls: ['./listado-directorios.component.css']
})

export class ListadoDirectoriosComponent implements OnInit, OnDestroy {

  public directorios: Array<DirectorioModel> = [];
  private directoriosDesplegados: Array<string> = [];

  private path = "";
  public dirBack: DirectorioModel = new DirectorioModel();
  public dirActual: DirectorioModel = new DirectorioModel();

  panelOpenState = true;

  private _transformer = (node: DirectorioModel, level: number) => {
    return {
      expandable: !!node.directorios && node.directorios.length > 0 || node.desplegado,
      name: node.nombre,
      level: level,
      path: node.path,
      isFile: node.esFile
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.directorios);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private directorioService: DirectorioService,
    private lecturaService: LecturaService,
    private store: Store<AppState>,
  ) {


  }



  ngOnDestroy() {

  }

  ngOnInit(): void {
    this.cargarDirectorios();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  public cargarDirectorios() {
    this.directorioService.getDirectorios(this.path, this.directoriosDesplegados).subscribe(result => {
      this.directorios = result;

      this.dirBack = this.directorios[0];
      this.dirActual = this.directorios[1];
      this.directorios.splice(0, 2);
      this.dataSource.data = this.directorios;

      this.desplegarLista();
      this.directoriosDesplegados.forEach(element => {
        console.log(element);
      });
    });
  }

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

  desplegar(path: string) {
    this.directoriosDesplegados.push(path);
    console.log(this.directoriosDesplegados);
    this.cargarDirectorios();
  }

  cerrar(path: string) {
    for (let index = 0; index < this.directoriosDesplegados.length; index++) {
      const dir = this.directoriosDesplegados[index];
      if (dir == path) {
        this.directoriosDesplegados.splice(index, 1);
        break;
      }
    }

    this.cargarDirectorios();
  }

  setPath(path: string) {
    this.path = path;
    this.directoriosDesplegados = [];
    this.cargarDirectorios();
  }



  volver() {
    this.path = this.dirBack.path;
    this.desplegar(this.path);
  }

  verFile(pathFile: string) {
    console.log(pathFile);
    this.lecturaService.leerFile(pathFile).subscribe(result => {
      this.store.dispatch(setFileOpen({ file: result }));
    });
  }

  isExpanded(node: ExampleFlatNode) {
    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.expand(node);
    } else {
      this.treeControl.collapse(node);
    }
    return this.treeControl.isExpanded(node);
  }


}
