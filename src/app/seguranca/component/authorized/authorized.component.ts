import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../service/auth.service";
import {Usuario} from "../../model/usuario.model";

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  usuario!: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.code) {
        this.auth.obterNovoAccessTokenComCode(params.code, params.state)
          .then(() => {
            console.log('token com status invalido: ' + this.auth.isAccessTokenInvalido());
            this.usuario = this.auth.carregaUsuarioLogado()!;
            if (this.usuario) {
              // this.router.navigate([this.usuario.empresa.rotaDefault]);
              this.router.navigate(['']);
            } else {
              this.router.navigate(['novo-cadastro']);
            }
          })
          .catch((e: any) => {
            console.error('Erro no callback: ' + e);
            this.router.navigate(['erro']);
          });
      } else {
        console.error('não veio o code nos parâmetros');
        this.router.navigate(['erro']);
      }
    });
  }
}
