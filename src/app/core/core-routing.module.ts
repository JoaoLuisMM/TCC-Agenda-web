import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../seguranca/service/auth.guard";
import {PaginaDefaultComponent} from "./components/pagina-default/pagina-default.component";

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard], data: {roles: ['ROLE_ADMINISTRADOR', 'ROLE_RECEPCIONISTA', 'ROLE_OPERACIONAL']},
  component: PaginaDefaultComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
