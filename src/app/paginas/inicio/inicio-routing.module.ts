import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioIndexComponent } from './inicio-index/inicio-index.component';

const routes: Routes = [
  {
    path: '',
    component: InicioIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
