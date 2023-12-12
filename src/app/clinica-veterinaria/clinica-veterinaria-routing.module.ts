import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { ClinicaVeterinariaComponent } from './components/main/clinica-veterinaria.component';
import { ClienteVeterinariaComponent } from './components/cliente-veterinaria/cliente-veterinaria.component';
import {AuthGuard} from "../seguranca/service/auth.guard";
import {FuncionarioComponent} from "../shared/components/funcionario/funcionario.component";
import {ConsultaComponent} from "./components/consulta/consulta.component";

const routes: Routes = [{
  path: 'clinica-veterinaria',
  component: ClinicaVeterinariaComponent,
  children: [{
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_RECEPCIONISTA']},
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_RECEPCIONISTA']},
  }, {
    path: 'funcionarios',
    component: FuncionarioComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR']},
  }, {
    path: 'clientes',
    component: ClienteVeterinariaComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_RECEPCIONISTA']},
  }, {
    path: 'consulta',
    component: ConsultaComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_OPERACIONAL']},
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClinicaVeterinariaRoutingModule { }
