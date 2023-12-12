import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ContServComponent} from './components/main/cont-serv.component';
import {ClienteComponent} from './components/cliente/cliente.component';
import {AuthGuard} from "../seguranca/service/auth.guard";
import {FuncionarioComponent} from "../shared/components/funcionario/funcionario.component";
import {AtendimentoComponent} from "./components/atendimento/atendimento.component";

const routes: Routes = [{
  path: 'escritorio-advocacia',
  component: ContServComponent,
  children: [{
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_RECEPCIONISTA']}
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_RECEPCIONISTA']}
  }, {
    path: 'funcionarios',
    component: FuncionarioComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR']},
  }, {
    path: 'clientes',
    component: ClienteComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_RECEPCIONISTA']}
  }, {
    path: 'atendimentos',
    component: AtendimentoComponent,
    canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_OPERACIONAL']},
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EscritorioAdvocaciaRoutingModule { }
