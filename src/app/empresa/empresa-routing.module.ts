import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VisualizaEmpresaComponent} from "./components/visualiza-empresa/visualiza-empresa.component";
import {AuthGuard} from "../seguranca/service/auth.guard";

const routes: Routes = [{
  path: 'xxxx',
  canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_OPERACIONAL']},
  component: VisualizaEmpresaComponent
},{
  path: 'dados-empresa',
  canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_OPERACIONAL']},
  component: VisualizaEmpresaComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
