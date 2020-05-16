import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ArchivoModel } from 'src/app/commons/models/archivo.model';
import { ConfigService } from 'src/app/commons/services/config.service';
import { DirectorioModel } from 'src/app/commons/models/directorio.model';


@Component({
  selector: 'app-inicio-index',
  templateUrl: './inicio-index.component.html',
  styleUrls: ['./inicio-index.component.css']
})
export class InicioIndexComponent implements OnInit, OnDestroy {


  private _resizeSubscription$: Subscription

  public height = 0;
  public width = 0;
  public sizeListadoDirectorios = 0;

  constructor(
    private config: ConfigService
  ) { }

  ngOnDestroy() {
    this._resizeSubscription$.unsubscribe();
  }

  ngOnInit(): void {
    this.setSizes();
    this._resizeSubscription$ = this.config.resizeObservable$.subscribe(() => this.setSizes());
  }

  setSizes() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.sizeListadoDirectorios = 300 * 100 / this.width;
  }

}

