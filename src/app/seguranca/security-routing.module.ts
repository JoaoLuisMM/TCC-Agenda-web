import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizedComponent} from './component/authorized/authorized.component';
import {EsqueciMinhaSenhaComponent} from './component/esqueci-minha-senha/esqueci-minha-senha.component';
import {NaoAutorizadoComponent} from "./component/nao-autorizado/nao-autorizado.component";

const routes: Routes = [{
  path: 'authorized',
  component: AuthorizedComponent
// }, {
//   path: 'perfil',
//   component: PerfilUsuarioComponent,
//   canActivate: [AuthGuard], data: {roles: ['ROLE_OPERACIONAL', 'ROLE_ADMINISTRADOR']}
}, {
  path: 'nao-autorizado',
  component: NaoAutorizadoComponent
}, {
  path: 'esqueci-minha-senha',
  component: EsqueciMinhaSenhaComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
