import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/commons/services/config.service';

interface IConfig {
  rows: Array<{
    size: number,
    columns: Array<{
      size: number
    }>
  }>
}

const defaultConfig: IConfig = {
  rows: [
    {
      size: 65,
      columns: [
        { size: (300 * 100 / window.innerWidth) },
        { size: (100 - (300 * 100 / window.innerWidth)) }
      ]
    },
    {
      size: 35,
      columns: [
        { size: 100 }
      ]
    }

  ]
};
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
  public minSizeListadoDirectorios = 0;

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnDestroy() {
    this._resizeSubscription$.unsubscribe();
  }

  public localStorageSplitIndex = 'angular-split-ws';

  public configSplit: IConfig = defaultConfig;

  ngOnInit(): void {
    if (localStorage.getItem(this.localStorageSplitIndex)) {
      this.configSplit = JSON.parse(localStorage.getItem(this.localStorageSplitIndex));
    }
    else {
      this.resetConfig();
    }

    this.setSizes();
    this._resizeSubscription$ = this.configService.resizeObservable$.subscribe(() => this.setSizes());
  }

  setSizes() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.sizeListadoDirectorios = 300 * 100 / this.width;
    this.minSizeListadoDirectorios = 250 * 100 / this.width;
    console.log(this.minSizeListadoDirectorios);
  }

  resetConfig() {
    this.configSplit = defaultConfig;

    localStorage.removeItem(this.localStorageSplitIndex);
  }

  onDragEnd(rowIndex: number, e: { gutterNum: number, sizes: Array<number> }) {
    if (rowIndex === -1) {
      this.configSplit.rows.forEach((row, index) => row.size = e.sizes[index]);
    }
    else {
      this.configSplit.rows[rowIndex].columns.forEach((colum, index) => colum.size = e.sizes[index]);
    }
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageSplitIndex, JSON.stringify(this.configSplit));
  }

}

