import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from './app.component';


import { AppRoutes } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BlockUIModule } from 'ng-block-ui';
import { CommonsServiceModule } from './commons/commons-service.module';
import { EffectsModule } from '@ngrx/effects';
import { appEffect } from './store/effects';
import localeES from '@angular/common/locales/es-CL';
import { DefaultLayoutComponent } from './layouts/default/default-layout.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularSplitModule } from 'angular-split';

registerLocaleData(localeES, 'es-CL');

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatSidenavModule,
    MatListModule,
    FormsModule
  ],
  imports: [ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
})
export class MaterialModule { }

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    AngularSplitModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    CommonsServiceModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffect),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    BlockUIModule.forRoot(),
    CodemirrorModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    }
  ],
  declarations: [AppComponent, DefaultLayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
