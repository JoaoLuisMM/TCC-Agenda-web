import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {InputMaskModule} from "primeng/inputmask";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {JwtInterceptor} from "./service/jwt.interceptor";
import {environment} from "../../environments/environment";
import {AuthorizedComponent} from "./component/authorized/authorized.component";
import {EsqueciMinhaSenhaComponent} from "./component/esqueci-minha-senha/esqueci-minha-senha.component";
import {NaoAutorizadoComponent} from "./component/nao-autorizado/nao-autorizado.component";
import {SecurityRoutingModule} from "./security-routing.module";

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [AuthorizedComponent, EsqueciMinhaSenhaComponent, NaoAutorizadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputMaskModule,
    ProgressSpinnerModule,
    SecurityRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    })
  ],
  providers: [
    JwtHelperService, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }]
})
export class SegurancaModule { }
