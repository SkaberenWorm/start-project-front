import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { Util } from './util/util';
import { UtilFormating } from './util/util.formating';
import { UtilValidation } from './util/util.validation';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule, MatInputModule, MatExpansionModule, MatTreeModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilAlert } from './util/util-alert';
import { DirectorioService } from './services/directorio.service';
import { ListadoDirectoriosComponent } from './components/listado-directorios/listado-directorios.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './components/editor/editor.component';
import { PanelComponent } from './components/panel/panel.component';
import { AngularSplitModule } from 'angular-split';
import { ActionService } from './services/action.service';
import { LecturaService } from './services/lectura.service';
@NgModule({
  declarations: [ListadoDirectoriosComponent, EditorComponent, PanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BlockUIModule,
    BlockUIHttpModule,
    NgbPaginationModule,
    NgbModalModule,
    MatSelectModule,
    MatInputModule,
    NgbModule,
    MatExpansionModule,
    MatTreeModule,
    MatIconModule,
    CodemirrorModule,
    AngularSplitModule.forRoot(),
    MatFormFieldModule
  ],
  providers: [
    Util,
    UtilFormating,
    UtilValidation,
    UtilAlert,
    DirectorioService,
    ActionService,
    LecturaService
  ],
  exports: [ListadoDirectoriosComponent, EditorComponent, PanelComponent]
})
export class CommonsServiceModule { }
