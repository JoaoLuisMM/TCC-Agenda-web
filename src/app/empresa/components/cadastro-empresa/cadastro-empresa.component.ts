import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Empresa} from "../../model/empresa.model";
import {EmpresaService} from "../../service/empresa.service";
import {ToastUtil} from "../../../shared/util/toast-util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit{

  exibindoMenu = false;
  showModal = false;
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  empresa = new Empresa();
  tipoDocumento = 'CNPJ';
  tipos = [{
    label: 'Pessoa Jurídica', value: 'PESSOA_JURIDICA'
  },{
    label: 'Pessoa Física', value: 'PESSOA_FISICA'
  }];

  ramosAtividades = [{
    label: 'Escolha o ramo de atividade', value: null
  },{
    label: 'Clínica médica', value: 'CLINICA_MEDICA'
  },{
    label: 'Clínica veterinária', value: 'CLINICA_VETERINARIA'
  },{
    label: 'Escritório advocacia', value: 'CONTRATO_SERVICO'
  },{
    label: 'Recursos humanos', value: 'ENTREVISTA_EMPREGO'
  }];

  constructor(
    private service: EmpresaService,
    private toastUtil: ToastUtil,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Clínica Médica', routerLink: ['1', 'clinica-medica'] },
      { label: 'Clínica Veterinária', routerLink: ['2', 'clinica-veterinaria'] },
      { label: 'Escritório advocacia', routerLink: ['3', 'escritorio-advocacia'] },
      { label: 'Entrevistas de Emprego', routerLink: ['4', 'entrevista-emprego'] },
    ];
    this.activeItem = this.items[1];
  }

  selecioneRamoAtividade(): void {
    this.showModal = true;
  }

  selecioneTipoPessoa(): void {
    this.tipoDocumento = 'CNPJ';
    if (this.empresa.tipoPessoa == 'PESSOA_FISICA') {
      this.tipoDocumento = 'CPF';
    }
  }

  save(): void {
    this.limpaCampoCelular();
    this.limpaCampoTelefone()
    this.service.save(this.empresa).subscribe({
      next: empresa => {
        this.empresa.id = empresa.id;
        this.toastUtil.showSuccessMessage('Salvando cadastro da empresa', 'Empresa cadastrada com sucesso');
        this.router.navigate([""]);
      },
      error: error => this.toastUtil.showErrorMessage(error, 'error', 'Salvando cadastro da empresa')
    })
  }

  limpaCampoCelular(): void {
    if (this.empresa.celular?.length == 0) {
      this.empresa.celular = null;
    }
  }

  limpaCampoTelefone(): void {
    if (this.empresa.telefone?.length == 0) {
      this.empresa.telefone = null;
    }
  }
}
