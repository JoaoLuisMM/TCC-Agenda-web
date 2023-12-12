import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmpresaRoutingModule} from "./empresa-routing.module";
import { CadastroEmpresaComponent } from './components/cadastro-empresa/cadastro-empresa.component';
import { VisualizaEmpresaComponent } from './components/visualiza-empresa/visualiza-empresa.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TabMenuModule} from "primeng/tabmenu";

@NgModule({
  declarations: [
    CadastroEmpresaComponent,
    VisualizaEmpresaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabMenuModule,
    SharedModule,
    RouterModule,
    EmpresaRoutingModule
  ]
})
export class EmpresaModule { }
//
