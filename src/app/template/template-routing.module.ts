import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {CadastroEmpresaComponent} from "../empresa/components/cadastro-empresa/cadastro-empresa.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ClienteComponent} from "./components/clientes/cliente.component";
import {MedicoComponent} from "./components/medicos/medico.component";
import {ConsultaComponent} from "./components/consulta/consulta.component";

const routes: Routes = [{
  path: 'novo-cadastro',
  component: CadastroEmpresaComponent,
  children: [{
    path: '',
    component: MainComponent,
    children: [{
      path: '',
      component: DashboardComponent
    }]
  }]
}, {
  path: 'novo-cadastro',
  component: CadastroEmpresaComponent,
  children: [{
    path: ':templateId/clinica-medica',
    component: MainComponent,
    children: [{
      path: '',
      component: DashboardComponent
    }, {
      path: 'dashboard/:id',
      component: DashboardComponent
    }, {
      path: 'pacientes/:id',
      component: ClienteComponent
    }, {
      path: 'funcionarios/:id',
      component: MedicoComponent
    }, {
      path: 'consulta/:id',
      component: ConsultaComponent
    }]
  }, {
    path: ':templateId/clinica-veterinaria',
    component: MainComponent,
    children: [{
      path: 'dashboard/:id',
      component: DashboardComponent
    }, {
      path: 'animais/:id',
      component: ClienteComponent
    }, {
      path: 'funcionarios/:id',
      component: MedicoComponent
    }, {
      path: 'consulta/:id',
      component: ConsultaComponent
    }]
  }, {
    path: ':templateId/escritorio-advocacia',
    component: MainComponent,
    children: [{
      path: 'dashboard/:id',
      component: DashboardComponent
    }, {
      path: 'clientes/:id',
      component: ClienteComponent
    }, {
      path: 'funcionarios/:id',
      component: MedicoComponent
    }, {
      path: 'consulta/:id',
      component: ConsultaComponent
    }]
  }, {
    path: ':templateId/entrevista-emprego',
    component: MainComponent,
    children: [{
      path: 'dashboard/:id',
      component: DashboardComponent
    }, {
      path: 'entrevistados/:id',
      component: ClienteComponent
    }, {
      path: 'funcionarios/:id',
      component: MedicoComponent
    }, {
      path: 'consulta/:id',
      component: ConsultaComponent
    }]
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
