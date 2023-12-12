import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TemplateRoutingModule} from "./template-routing.module";
import {MedicoComponent} from "./components/medicos/medico.component";
import {ClienteComponent} from "./components/clientes/cliente.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MainComponent} from "./components/main/main.component";
import { ConsultaComponent } from './components/consulta/consulta.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    ClienteComponent,
    MedicoComponent,
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TemplateRoutingModule
  ],
  exports: [
    RouterModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
//x
