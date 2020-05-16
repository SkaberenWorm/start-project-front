import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioService } from './inicio.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonsServiceModule } from 'src/app/commons/commons-service.module';
import { InicioIndexComponent } from './inicio-index/inicio-index.component';
import { MatSidenavModule } from '@angular/material';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { AngularSplitModule } from 'angular-split';


@NgModule({
  declarations: [InicioIndexComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonsServiceModule,
    MatSidenavModule,
    CodemirrorModule,
    AngularSplitModule
  ],
  providers: [InicioService]
})
export class InicioModule { }
