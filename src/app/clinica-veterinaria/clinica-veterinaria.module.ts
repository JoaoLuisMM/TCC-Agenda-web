import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClinicaVeterinariaRoutingModule } from './clinica-veterinaria-routing.module';
import { ClienteVeterinariaComponent } from './components/cliente-veterinaria/cliente-veterinaria.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ClinicaVeterinariaComponent } from './components/main/clinica-veterinaria.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { FormClienteComponent } from './components/form-cliente/form-cliente.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ClienteVeterinariaComponent,
    ClinicaVeterinariaComponent,
    ConsultaComponent,
    FormClienteComponent
  ],
  imports: [
    CommonModule,
    ClinicaVeterinariaRoutingModule,
    SharedModule,
    RouterModule,
  ]
})
export class ClinicaVeterinariaModule { }
