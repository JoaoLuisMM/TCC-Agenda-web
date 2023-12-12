import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  cpf!: string;
  solicitandoNovaSenha = false;
  mensagem!: string | null;

  constructor(
    // private usuarioService: UsuarioService,
    // private toastUtil: ToastUtil,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  solicitaNovaSenha(): void {
    if (this.cpf && this.cpf.length === 11) {
      this.mensagem = null;
      this.solicitandoNovaSenha = true;
      // this.usuarioService.solicitaNovaSenha(this.cpf).subscribe({
      //   next: retorno => {
      //     this.toastUtil.showMessage('success', 'Esqueci minha senha', retorno, 7000);
      //     this.router.navigate(['/']);
      //   },
      //   error: erros => {
      //     this.toastUtil.showErrorMessage(erros, 'error', 'Esqueci minha senha', 7000);
      //     this.mensagem = this.trataErros(erros);
      //     this.solicitandoNovaSenha = false;
      //   },
      //   complete: () => {
      //     this.toastUtil.showMessage('success', 'Esqueci minha senha', 'finalizou');
      //     this.solicitandoNovaSenha = false;
      //   }
      // });
    }
  }

  private trataErros(erros: any): string | null {
    if (erros.error instanceof Array) {
      return erros.error[0].mensagem;
    } else {
      return erros.error.message;
    }
  }
}
