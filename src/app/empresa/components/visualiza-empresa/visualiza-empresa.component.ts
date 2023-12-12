import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../model/empresa.model";
import {EmpresaService} from "../../service/empresa.service";
import {ToastUtil} from "../../../shared/util/toast-util";
import {AuthService} from "../../../seguranca/service/auth.service";
import {Usuario} from "../../../seguranca/model/usuario.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-visualiza-empresa',
  templateUrl: './visualiza-empresa.component.html',
  styleUrls: ['./visualiza-empresa.component.css']
})
export class VisualizaEmpresaComponent implements OnInit {

  empresa!: Empresa;
  usuario!: Usuario;

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastUtil
  ) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.carregaUsuarioLogado()!;
    if (this.usuario) {
      this.empresaService.findById(this.usuario.empresa.id).subscribe({
        next: empresa => {
          this.empresa = new Empresa(empresa);
        },
        error: error => this.toast.showErrorMessage(error, 'error', 'Consultado dados da empresa')
      })
    } else {
      this.toast.showMessage('error', 'Dados da empresa', 'Usuário não está logado');
    }
  }

}
