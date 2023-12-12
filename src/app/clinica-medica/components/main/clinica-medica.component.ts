import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../seguranca/service/auth.service";
import {Usuario} from "../../../seguranca/model/usuario.model";

interface MenuClinica {
  name: string,
  rota: string;
}

@Component({
  selector: 'app-clinica-medica',
  templateUrl: './clinica-medica.component.html',
  styleUrls: ['./clinica-medica.component.css']
})
export class ClinicaMedicaComponent implements OnInit {

  usuario!: Usuario;
  sidebarVisible: boolean = true;
  itensMenu!: MenuClinica[];
  selectedCity!: MenuClinica;
  exibindoMenu = true;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.usuario = this.auth.carregaUsuarioLogado()!;
    this.itensMenu = [
      { name: 'Dashboard', rota: 'dashboard' },
      { name: 'Clientesx', rota: 'clientes' },
      { name: 'Funcionários', rota: 'funcionarios' },
    ];
    if (this.usuario.isOperacional()) {
      // this.exibindoMenu = false;
      this.router.navigate([`clinica-medica/consulta`]);
    }
  }

  // navigate(event :  ListboxClickEvent): void {
  navigate(rota:  string): void {
    this.router.navigate([`clinica-medica/${rota}`])
  }
}
