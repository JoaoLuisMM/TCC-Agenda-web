import {NgModule} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {ClinicaMedicaComponent} from "./components/main/clinica-medica.component";
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {ClientesComponent} from './components/clientes/clientes.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClinicaMedicaRoutingModule} from "./clinica-medica-routing.module";
import {CardModule} from "primeng/card";
import {ConsultaComponent} from "./components/consulta/consulta.component";

@NgModule({
  declarations: [
    ClinicaMedicaComponent,
    DashboardComponent,
    ClientesComponent,
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClinicaMedicaRoutingModule,
    RouterModule,
    FullCalendarModule,
    ReactiveFormsModule,
    NgFor,
    CardModule,
  ]
})
export class ClinicaMedicaModule { }
