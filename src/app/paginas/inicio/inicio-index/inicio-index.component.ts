import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/app/commons/services/config.service';

interface IConfig {
  columns: Array<{
    size: number,
    minSize: number,
    rows: Array<{
      size: number,
      minSize: number,
    }>
  }>
}

const defaultConfig: IConfig = {
  columns: [
    {
      size: (300 * 100 / window.innerWidth),
      minSize: (250 * 100 / window.innerWidth),
      rows: [
        { size: 50, minSize: 40 },
        { size: 25, minSize: 30 },
        { size: 25, minSize: 30 },
      ]
    },
    {
      size: (100 - (300 * 100 / window.innerWidth)),
      minSize: 0,
      rows: [
        { size: 60, minSize: 50 },
        { size: 40, minSize: 50 }
      ]
    }

  ]
};
@Component({
  selector: 'app-inicio-index',
  templateUrl: './inicio-index.component.html',
  styleUrls: ['./inicio-index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioIndexComponent implements OnInit, OnDestroy {


  private _resizeSubscription$: Subscription

  public height = 0;
  public width = 0;
  public sizeListadoDirectorios = 0;
  public minSizeListadoDirectorios = 0;

  constructor(
    private configService: ConfigService,
    private changeDetector: ChangeDetectorRef,
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
    console.log("setSizes()");
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.sizeListadoDirectorios = 350 * 100 / this.width;
    this.minSizeListadoDirectorios = 250 * 100 / this.width;
    this.changeDetector.detectChanges();
  }

  resetConfig() {
    console.log("resetConfig()");
    this.configSplit = defaultConfig;
    localStorage.removeItem(this.localStorageSplitIndex);
  }

  onDragEnd(rowIndex: number, e: { gutterNum: number, sizes: Array<number> }) {
    if (rowIndex === -1) {
      this.configSplit.columns.forEach((row, index) => row.size = e.sizes[index]);
    }
    else {
      this.configSplit.columns[rowIndex].rows.forEach((row, index) => row.size = e.sizes[index]);
    }
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageSplitIndex, JSON.stringify(this.configSplit));
  }

}

