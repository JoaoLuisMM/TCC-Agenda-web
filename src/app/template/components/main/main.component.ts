import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListboxClickEvent} from "primeng/listbox";
import {MenuClinica} from "../../../shared/model/menu-clinica.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sidebarVisible: boolean = true;
  // itensMenu!: MenuClinica[];
  itensMenu!: any[];
  selectedCity!: MenuClinica;
  template!: string;
  meuMap = new Map();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.meuMap.set('1', [
      { name: 'Dashboard', template: 'clinica-medica', rota: 'dashboard' },
      { name: 'Pacientes', template: 'clinica-medica', rota: 'pacientes' },
      { name: 'Funcionários', template: 'clinica-medica', rota: 'funcionarios' },
      { name: 'Consulta', template: 'clinica-medica', rota: 'consulta' }
    ]);
    this.meuMap.set('2', [
      { name: 'Dashboard', template: 'clinica-veterinaria', rota: 'dashboard' },
      { name: 'Animais', template: 'clinica-veterinaria', rota: 'animais' },
      { name: 'Funcionários', template: 'clinica-veterinaria', rota: 'funcionarios' },
      { name: 'Consulta', template: 'clinica-veterinaria', rota: 'consulta' }
    ]);
    this.meuMap.set('3', [
      { name: 'Dashboard', template: 'escritorio-advocacia', rota: 'dashboard' },
      { name: 'Clientes', template: 'escritorio-advocacia', rota: 'clientes' },
      { name: 'Funcionários', template: 'escritorio-advocacia', rota: 'funcionarios' },
      { name: 'Consulta', template: 'escritorio-advocacia', rota: 'consulta' }
    ]);
    this.meuMap.set('4', [
      { name: 'Dashboard', template: 'entrevista-emprego', rota: 'dashboard' },
      { name: 'Clientes', template: 'entrevista-emprego', rota: 'entrevistados' },
      { name: 'Funcionários', template: 'entrevista-emprego', rota: 'entrevistador' },
      { name: 'Entrevista', template: 'entrevista-emprego', rota: 'consulta' }
    ]);
  }

  ngOnInit() {
    this.template = this.activatedRoute.snapshot.params['templateId'];
    if (!this.template) {
      this.template = '1';
    }
    this.itensMenu = this.meuMap.get(this.template);
    const meuMap1 = new Map();
    meuMap1.set('1', {template: 'clinica-medica'});
    meuMap1.set('2', {template: 'clinica-veterinaria'});
    meuMap1.set('3', {template: 'escritorio-advocacia'});
    meuMap1.set('4', {template: 'entrevista-emprego'});
    this.router.navigate([`novo-cadastro/${this.template}/${meuMap1.get(this.template).template}/dashboard`, this.template])
  }

  navigate(event :  ListboxClickEvent): void {
    this.router.navigate([`novo-cadastro/${this.template}/${event.value.template}/${event.value.rota}`, this.template])
  }
}
