import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../seguranca/service/auth.service";
import {Usuario} from "../../../seguranca/model/usuario.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pagina-default',
  templateUrl: './pagina-default.component.html',
  styleUrls: ['./pagina-default.component.css']
})
export class PaginaDefaultComponent implements OnInit {

  usuario!: Usuario;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.usuario = this.auth.carregaUsuarioLogado()!;
    let rotaDefault = this.usuario.empresa.rotaDefault;
    if (this.usuario) {
      if (this.usuario.isOperacional()) {
        rotaDefault += '/' + this.usuario.empresa.paginaPrincipal;
      }
      this.router.navigate([rotaDefault]);
    } else {
      this.router.navigate(['novo-cadastro']);
    }
  }
}
