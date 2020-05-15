import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { Util } from './util/util';
import { UtilFormating } from './util/util.formating';
import { UtilValidation } from './util/util.validation';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule, MatInputModule, MatExpansionModule, MatTreeModule, MatIconModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilAlert } from './util/util-alert';
import { DirectorioService } from './services/directorio.service';
import { ListadoDirectoriosComponent } from './components/listado-directorios/listado-directorios.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ListadoDirectoriosComponent],
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
    CodemirrorModule
  ],
  providers: [
    Util,
    UtilFormating,
    UtilValidation,
    UtilAlert,
    DirectorioService
  ],
  exports: [ListadoDirectoriosComponent]
})
export class CommonsServiceModule { }
