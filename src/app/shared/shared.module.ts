import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListboxModule} from "primeng/listbox";
import {SidebarModule} from "primeng/sidebar";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import { DialogModule } from 'primeng/dialog';
import { FocusTrapModule } from 'primeng/focustrap';
import {InputMaskModule} from "primeng/inputmask";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from "primeng/api";
import { FullCalendarModule } from '@fullcalendar/angular';
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import {MenubarModule} from "primeng/menubar";
import { FormCadastroClienteComponent } from './components/form-cadastro-cliente/form-cadastro-cliente.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';

@NgModule({
  declarations: [
    FormCadastroClienteComponent,
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MenubarModule,
    TableModule,
    SidebarModule,
    CalendarModule,
    FullCalendarModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    ListboxModule,
    FocusTrapModule,
    ConfirmDialogModule,
    CheckboxModule,
    DropdownModule,
    CardModule,
    DialogModule
  ],
  exports: [
    FormsModule,
    MenubarModule,
    TableModule,
    SidebarModule,
    CalendarModule,
    FullCalendarModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    ListboxModule,
    FocusTrapModule,
    ConfirmDialogModule,
    CheckboxModule,
    DropdownModule,
    CardModule,
    DialogModule,
    FormCadastroClienteComponent
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
