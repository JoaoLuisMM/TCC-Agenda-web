import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ContServComponent } from './components/main/cont-serv.component';
import { EscritorioAdvocaciaRoutingModule } from './escritorio-advocacia-routing.module';
import { AtendimentoComponent } from './components/atendimento/atendimento.component';

@NgModule({
  declarations: [
    ContServComponent,
    DashboardComponent,
    ClienteComponent,
    ContServComponent,
    AtendimentoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    EscritorioAdvocaciaRoutingModule
  ]
})
export class EscritorioAdvocaciaModule { }
