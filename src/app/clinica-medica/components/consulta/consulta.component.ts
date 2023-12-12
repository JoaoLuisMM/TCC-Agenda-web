import {Component, OnInit} from '@angular/core';
import {AgendamentoService} from "../../../agendamento/service/agendamento.service";
import {ToastUtil} from "../../../shared/util/toast-util";
import {Agendamento} from "../../../agendamento/model/agendamento.model";
import {ObservacaoConsulta, ConsultaService, HistoricoConsulta} from "../../../agendamento/service/consulta.service";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  agendamentos: Agendamento[] = [];
  totalRegistros!: number;
  visible = false;
  historico!: HistoricoConsulta;
  consulta = new ObservacaoConsulta();
  clienteId!: number;

  constructor(
    private agendamentoService: AgendamentoService,
    private clienteAgendamentoService: ConsultaService,
    private toastUtil: ToastUtil
  ) {
  }

  ngOnInit(): void {
    this.findAgendamentos();
  }

  findAgendamentos(): void {
    this.agendamentoService.findToConsulta().subscribe({
      next: agendamentos => {
        this.agendamentos = Agendamento.toArray(agendamentos);
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
}
