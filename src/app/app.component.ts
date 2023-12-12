import {Component, OnInit} from '@angular/core';
import {AuthService} from "./seguranca/service/auth.service";
// import {PrimeNGConfig} from "primeng/api";
// import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'TCC João Luis';
  showCabecalhoLogado = true;

  constructor(
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    if (this.auth.isAccessTokenInvalido()) {
      this.showCabecalhoLogado = false;
    }
    // Código para atualizar a aba "Sessão", dependendo da modalidade, ao alterar o processo
    this.auth.loginObserver.subscribe((logado: boolean) => this.showCabecalhoLogado = logado);
    // this.translate('pt-BR');
    // const context = this;
    // window.addEventListener('beforeunload', function (e) {
    //   const currentUser = localStorage.getItem('usuario');
    //   if (currentUser) {
    //     context.logoutOnClose();
    //   }
    // });
  }

  // translate(lang: string) {
  //   this.translateService.use(lang);
  //   this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  // }

  // logoutOnClose() {
  //   // localStorage.removeItem('usuario');
  //   // localStorage.removeItem('token');
  // }
}
