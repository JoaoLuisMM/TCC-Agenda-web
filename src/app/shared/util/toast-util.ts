import {MessageService} from 'primeng/api';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotAuthenticatedError} from "../../seguranca/service/jwt.interceptor";
import {AuthService} from "../../seguranca/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ToastUtil {

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  showSuccessMessage(summary: string, detail: string, life?: number) {
    let tempo = 7000;
    if (life) {
      tempo = life;
    }
    this.messageService.add({severity: 'success', summary: summary, detail: detail, life: tempo});
  }

  showMessage(severity: string, summary: string, detail: string, life?: number) {
    let tempo = 7000;
    if (life) {
      tempo = life;
    }
    this.messageService.add({severity: severity, summary: summary, detail: detail, life: tempo});
  }

  showErrorMessage(erros: any, severity: string, summary: string, life?: number) {
    // console.log('---------> chamou a função: ' + JSON.stringify(erros));
    let tempo = 7000;
    if (life) {
      tempo = life;
    }
    if (erros instanceof NotAuthenticatedError) {
      this.authService.login();
      return;
    }

    // TODO o status 0 não é um código HTTP, porém é o que o FF e o chrome apresentam, quando não conseguem conectar
    if (erros instanceof HttpErrorResponse && erros.status === 0) {
      this.messageService.add({severity: severity, summary: summary, detail: 'Não foi possível acessar o sistema', life: tempo});
    } else if (erros.status === 404) {
      erros.error.forEach((erro: any) => {
        this.messageService.add({severity: severity, summary: summary, detail: erro.message, life: tempo});
      });
    } else if (erros.status === 401) {
      this.messageService.add({severity: severity, summary: summary, detail: 'Usuário ou senha inválidos', life: tempo});
    } else if (erros.status === 405) {
      erros.error.forEach((erro: any) => {
        this.messageService.add({severity: severity, summary: summary, detail: erro.message, life: tempo});
      });
    } else if (!erros.error) {
      this.messageService.add({severity: severity, summary: summary, detail: 'Erro não tratado', life: tempo});
    } else if (erros.status === 400) {
      erros.error.forEach((erro: any) => {
        this.messageService.add({severity: severity, summary: summary, detail: erro.message, life: tempo});
      });
    } else if (erros.status === 500) {
      erros.error.forEach((erro: any) => {
        this.messageService.add({severity: severity, summary: summary, detail: erro.message, life: tempo});
      });
    } else {
      this.messageService.add({severity: severity, summary: summary, detail: erros.error.error, life: tempo});
    }
  }
}
