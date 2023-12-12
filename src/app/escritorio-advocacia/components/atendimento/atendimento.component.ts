import {Component, OnInit} from '@angular/core';
import {Agendamento} from "../../../agendamento/model/agendamento.model";
import {ConsultaService, HistoricoConsulta, ObservacaoConsulta} from "../../../agendamento/service/consulta.service";
import {AgendamentoService} from "../../../agendamento/service/agendamento.service";
import {ToastUtil} from "../../../shared/util/toast-util";
import {AgendamentoAdvocaticio} from "../../model/agendamento-advocaticio.model";
import {AgendamentoAdvocaticioService} from "../../service/agendamento-advocaticio.service";

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {

  agendamentos: AgendamentoAdvocaticio[] = [];
  totalRegistros!: number;
  visible = false;
  historico!: HistoricoConsulta;
  consulta = new ObservacaoConsulta();
  clienteId!: number;

  tiposCompromissos: any[] = [];

  constructor(
    private agendamentoService: AgendamentoAdvocaticioService,
    private clienteAgendamentoService: ConsultaService,
    private toastUtil: ToastUtil
  ) {
  }

  ngOnInit(): void {
    this.findAgendamentos();
    this.tiposCompromissos = [
      {value: null, label: 'Selecione o tipo'},
      {value: 'AUDIENCIA', label: 'Audiência'},
      {value: 'ANALISE_PROCESSO', label: 'Análise de processo'},
      {value: 'DILIGENCIA', label: 'Diligência'},
      {value: 'REUNIAO', label: 'Reunião'}
    ];
  }

  findAgendamentos(): void {
    this.agendamentoService.findToConsulta().subscribe({
      next: agendamentos => {
        this.agendamentos = AgendamentoAdvocaticio.toArray(agendamentos);
        this.totalRegistros = this.agendamentos.length;
      },
      error: error => this.toastUtil.showErrorMessage(error, 'error', 'Consultando agendamentos')
    })
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

  tipoCompromissoDescricao(tipoCompromisso: string): string {
    return this.tiposCompromissos.find(t => t.value === tipoCompromisso)?.label;
  }
}
