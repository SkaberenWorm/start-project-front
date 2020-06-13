import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgbModalModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { EditorComponent } from './components/editor/editor.component';
import { ListadoDirectoriosComponent } from './components/listado-directorios/listado-directorios.component';
import { PanelComponent } from './components/panel/panel.component';
import { ActionService } from './services/action.service';
import { DirectorioService } from './services/directorio.service';
import { Util } from './util/util';
import { UtilAlert } from './util/util-alert';
import { UtilFormating } from './util/util.formating';
import { UtilValidation } from './util/util.validation';


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
    MatFormFieldModule,
    MatTooltipModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [
    Util,
    UtilFormating,
    UtilValidation,
    UtilAlert,
    DirectorioService,
    ActionService,
  ],
  exports: [ListadoDirectoriosComponent, EditorComponent, PanelComponent]
})
export class CommonsServiceModule { }
