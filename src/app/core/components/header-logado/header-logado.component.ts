import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../seguranca/model/usuario.model";
import {AuthService} from "../../../seguranca/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-logado',
  templateUrl: './header-logado.component.html',
  styleUrls: ['./header-logado.component.css']
})
export class HeaderLogadoComponent implements OnInit{

  dataHora = new Date();
  logado = false;
  usuario = new Usuario();

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.usuario = this.auth.carregaUsuarioLogado()!;
    this.logado = this.usuario !== null;
  }

  logout(): void {
    this.auth.logout();
  }

  dashboard(): void {
    this.router.navigate([this.usuario.empresa.rotaDefault]);
  }
}
