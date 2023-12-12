import {Component} from '@angular/core';

@Component({
  selector: 'app-header-nao-logado',
  templateUrl: './header-nao-logado.component.html',
  styleUrls: ['./header-nao-logado.component.css']
})
export class HeaderNaoLogadoComponent {
  dataHora = new Date();

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.dataHora = new Date();
    }, 1000);
  }
}
