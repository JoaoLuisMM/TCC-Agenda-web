import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClinicaMedicaComponent} from "./components/main/clinica-medica.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ClientesComponent} from "./components/clientes/clientes.component";
import {AuthGuard} from "../seguranca/service/auth.guard";
import {ConsultaComponent} from "./components/consulta/consulta.component";
import {FuncionarioComponent} from "../shared/components/funcionario/funcionario.component";

const routes: Routes = [{
  path: 'clinica-medica',
  component: ClinicaMedicaComponent,
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
    path: 'pacientes',
    component: ClientesComponent,
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
export class ClinicaMedicaRoutingModule { }
