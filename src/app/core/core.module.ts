import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData} from '@angular/common';
import {EmpresaModule} from "../empresa/empresa.module";
import {ClinicaMedicaModule} from "../clinica-medica/clinica-medica.module";
import {SharedModule} from "../shared/shared.module";
import { ClinicaVeterinariaModule } from '../clinica-veterinaria/clinica-veterinaria.module';
import {AgendamentoModule} from "../agendamento/agendamento.module";
import {HttpClientModule} from "@angular/common/http";
import {SegurancaModule} from "../seguranca/seguranca.module";
import { EscritorioAdvocaciaModule } from '../escritorio-advocacia/escritorio-advocacia.module';
import {TemplateModule} from "../template/template.module";
import {HeaderLogadoComponent} from "./components/header-logado/header-logado.component";
import { TratamentoErroComponent } from './components/tratamento-erro/tratamento-erro.component';
import localePt from '@angular/common/locales/pt';
import { HeaderNaoLogadoComponent } from './components/header-nao-logado/header-nao-logado.component';
import { PaginaDefaultComponent } from './components/pagina-default/pagina-default.component';
import {EmpresaRoutingModule} from "./core-routing.module";
import {EntrevistaEmpregoModule} from "../entrevista-emprego/entrevista-emprego.module";

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    HeaderLogadoComponent,
    TratamentoErroComponent,
    HeaderNaoLogadoComponent,
    PaginaDefaultComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    SegurancaModule,
    EmpresaRoutingModule,
    EmpresaModule,
    ClinicaMedicaModule,
    ClinicaVeterinariaModule,
    EscritorioAdvocaciaModule,
    EntrevistaEmpregoModule,
    TemplateModule,
    AgendamentoModule
  ],
  exports: [
    HeaderLogadoComponent,
    HeaderNaoLogadoComponent,
    SharedModule,
    EmpresaModule,
    ClinicaMedicaModule,
    ClinicaVeterinariaModule,
    EscritorioAdvocaciaModule,
    TemplateModule,
    AgendamentoModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '+03:00' }}]
})
export class CoreModule { }
