import { Component } from '@angular/core';
import {Agendamento, Especialista} from "../../../agendamento/model/agendamento.model";
import {ConsultaService, HistoricoConsulta, ObservacaoConsulta} from "../../../agendamento/service/consulta.service";
import {AgendamentoService} from "../../../agendamento/service/agendamento.service";
import {ToastUtil} from "../../../shared/util/toast-util";
import {ActivatedRoute} from "@angular/router";
import {ClienteAgendamento} from "../../../agendamento/model/cliente-agendamento.model";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {

  agendamentos: Agendamento[] = [];
  totalRegistros!: number;
  visible = false;
  historico!: HistoricoConsulta;
  consulta = new ObservacaoConsulta();
  clienteId!: number;
  especialista = 'Médico';
  templateId!: string;

  constructor(
    private agendamentoService: AgendamentoService,
    private clienteAgendamentoService: ConsultaService,
    private toastUtil: ToastUtil,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.templateId = this.activatedRoute.snapshot.params['id'];
    if (!this.templateId) {
      this.templateId = '1';
    }
    this.findAgendamentos();
  }

  findAgendamentos(): void {
    if (this.templateId === '1') {
      this.especialista = 'Médico';
      this.agendamentos.push(new Agendamento({
        id: 1,
        cliente: new ClienteAgendamento({id: 1, nome: 'Um paciente qualquer'}),
        especialista: new Especialista({id: 1, nome: 'Um médico qualquer'}),
        situacao: 'ATIVO',
        dataInicial: new Date(), dataFinal: null, diaTodo: false
      }));
    }
    if (this.templateId === '2') {
      this.especialista = 'Veterinário';
      this.agendamentos.push(new Agendamento({
        id: 2,
        cliente: new ClienteAgendamento({id: 1, nome: 'Um animal qualquer'}),
        especialista: new Especialista({id: 1, nome: 'Um veterinário qualquer'}),
        situacao: 'ATIVO',
        dataInicial: new Date(), dataFinal: null, diaTodo: false
      }));
    }
    if (this.templateId === '3') {
      this.especialista = 'Advogado';
      this.agendamentos.push(new Agendamento({
        id: 3,
        cliente: new ClienteAgendamento({id: 1, nome: 'Um cliente qualquer'}),
        especialista: new Especialista({id: 1, nome: 'Um advogado qualquer'}),
        situacao: 'ATIVO',
        dataInicial: new Date(), dataFinal: null, diaTodo: false
      }));
    }
  }

  atender(clienteId: number): void{
    this.clienteAgendamentoService.findById(clienteId).subscribe({
      next: historico => {
        this.historico = new HistoricoConsulta(historico);
        this.visible = true;
        this.clienteId = clienteId;
      },
      error: error => this.toastUtil.showErrorMessage(error, 'error', 'Consultando histórico')
    })
  }

  save(): void {
    if (!this.clienteId) {
      this.toastUtil.showMessage('error', 'Cliente', 'Nenhum cliente foi selecionado');
      return;
    }
    if(this.consulta.observacoes.length == 0) {
      this.toastUtil.showMessage('error', 'Observações', 'As observações são obrigatórias');
      return;
    }
    this.clienteAgendamentoService.save(this.historico.clienteId, this.consulta).subscribe({
      next: () => {
        this.visible = false;
        this.consulta = new ObservacaoConsulta();
        this.toastUtil.showSuccessMessage('Salvando consulta', 'Consulta salva com sucesso');
      },
      error: error => this.toastUtil.showErrorMessage(error, 'error', 'Salvando consulta')
    })
  }

  hideDialog(): void {
    this.visible = false;
  }
}
