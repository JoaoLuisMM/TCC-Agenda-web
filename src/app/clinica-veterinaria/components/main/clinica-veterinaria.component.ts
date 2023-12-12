import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Usuario} from "../../../seguranca/model/usuario.model";
import {AuthService} from "../../../seguranca/service/auth.service";

@Component({
  selector: 'app-clinica-veterinaria',
  templateUrl: './clinica-veterinaria.component.html',
  styleUrls: ['./clinica-veterinaria.component.css']
})
export class ClinicaVeterinariaComponent {

  usuario!: Usuario;
  sidebarVisible: boolean = true;
  exibindoMenu = true;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.usuario = this.auth.carregaUsuarioLogado()!;
    if (this.usuario.isOperacional()) {
      this.router.navigate([`clinica-veterinaria/consulta`]);
    }
  }
}
