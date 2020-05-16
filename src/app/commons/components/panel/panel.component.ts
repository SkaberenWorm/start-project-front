import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DirectorioModel } from '../../models/directorio.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  private _subscription: Subscription;

  public directorioActual: DirectorioModel = null;

  public = 0;
  public package = "";

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {

    this._subscription = this.store.select('directorio').subscribe(state => {
      if (state.dir != null) {
        this.package = this.pathToPackage(state.dir.path);
        this.directorioActual = state.dir;
      }
    });

  }


  private pathToPackage(path: string): string {
    if (path.indexOf('src/main/java/') == -1) {
      return ' No se ha encontrado el package';
    }
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
    Array.from(Array(10)).forEach(i => {
      path = path.replace('/', '.');
    });

    return ' ' + path;
  }

}
