import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarApi, CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput} from '@fullcalendar/core';
import {configCalendar} from '../../../shared/lib/event-utils';
import {ConfirmationService, MessageService} from "primeng/api";
import {AgendamentoFilter, AgendamentoService} from "../../../agendamento/service/agendamento.service";
import {Agendamento, Especialista} from "../../../agendamento/model/agendamento.model";
import {ToastUtil} from "../../../shared/util/toast-util";
import {Cliente} from "../../../core/model/cliente.model";
import {ClienteService} from "../../../core/service/cliente.service";
import {EspecialistaService} from "../../../core/service/especialista.service";
import {DataUtil} from "../../../shared/lib/data-util";
import {ClienteAgendamento} from "../../../agendamento/model/cliente-agendamento.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  calendarVisible = true;
  calendarOptions!: CalendarOptions;
  currentEvents: EventApi[] = [];
  evento!: any;
  //
  agendamentos: Agendamento[] = [];
  agendamento!: Agendamento;
  clientes: any[] = [];
  medicos: any[] = [];
  calendarApi!: CalendarApi;
  showModal = false;
  titulo = 'Novo agendamento';
  showDialog = false;
  cliente!: Cliente;
  horaInicial!: string | null;
  horaFinal!: string | null;
  horarioComercialInicio!: Date;
  horarioComercialFim!: Date;
  dataInicialSelecionada!: Date;
  dataFinalSelecionada!: Date;
  agendamentoFilter = new AgendamentoFilter();
  //
  carregandoPagina = false;

  constructor(
    private agendamentoService: AgendamentoService,
    private clienteService: ClienteService,
    private medicoService: EspecialistaService,
    private changeDetector: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toastUtil: ToastUtil,
  ) {
    this.dataInicialSelecionada = new Date();
    this.dataFinalSelecionada = this.dataInicialSelecionada;
  }

  ngOnInit(): void {
    this.carregandoPagina = true;
    this.calendarOptions = configCalendar;
    const that = this;
    this.calendarOptions.select = function(selectInfo: DateSelectArg) {
      // console.log('showModalNewSchedule');
      that.showModalNewSchedule(selectInfo);
    };
    this.calendarOptions.eventClick = function(clickInfo: EventClickArg) {
      // console.log('handleEventClick');
      that.handleEventClick(clickInfo);
    };
    this.calendarOptions.eventsSet = function(events: EventApi[]) {
      // console.log('handleEvents');
      that.handleEvents(events);
    };
    this.calendarOptions.datesSet = function(event: any) {
      that.dataInicialSelecionada = event.start;
      that.dataFinalSelecionada = event.end;
      that.changeMonth();
    };
    this.agendamentoFilter = new AgendamentoFilter();
    this.findAgendamentos();
  }

  findAgendamentos(): void {
    this.agendamentoService.findToDashboard(this.agendamentoFilter).subscribe({
      next: agendamentos => {
        this.carregandoPagina = false;
        this.agendamentos = Agendamento.toArray(agendamentos);
        this.addAgendamentos();
        this.clienteService.findClientesAgendamento().subscribe({
          next: clientes => {
            this.clientes = ClienteAgendamento.toArray(clientes);
            this.clientes.unshift(new Cliente({nome: 'Selecione um cliente'}));
          },
          error: error => this.toastUtil.showErrorMessage(error, 'error', 'Consultando clientes')
        });
        this.medicoService.findMedicosAgendamento().subscribe({
          next: medicos => this.medicos = Especialista.toArray(medicos),
          error: error => this.toastUtil.showErrorMessage(error, 'error', 'Consultando médicos')
        })
      },
      error: error => this.toastUtil.showErrorMessage(error, 'error', 'Consultando agendamentos')
    })
  }

  addAgendamentos(): void {
    const events: EventInput[] = [];
    this.agendamentos.forEach(agendamento => {
      events.push({
        id: agendamento.id.toString(),
        clienteId: agendamento.cliente.id,
        doutorId: agendamento.especialista.id,
        title: agendamento.cliente.nome!,
        start: agendamento.dataInicialConvertida()!,
        end: agendamento.dataFinalConvertida()!,
        allDay: false
      });
    });
    this.calendarOptions.events = events;
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    // this.calendarOptions.mutate((options) => {
    //   options.weekends = !options.weekends;
    // });
  }

  showModalNewSchedule(selectInfo: DateSelectArg): void {
    this.agendamento = new Agendamento();
    let dataSelecionada = new Date(selectInfo.start.toDateString());
    const dataAtual = new Date(new Date().toDateString());
    if (dataSelecionada < dataAtual) {
      this.messageService.add({ severity: 'error', summary: 'Incluíndo consulta', detail: 'Não é permitido agendamentos em datas anteriores a data de hoje' });
      return;
    }
    this.titulo = 'Novo agendamento';
    this.agendamento.dataInicial = selectInfo.start;
    this.calendarApi = selectInfo.view.calendar;
    this.showModal = true;
  }

  handleDateSelect() {
    if (this.horaInicial && this.horaFinal) {
      this.horarioComercialInicio = DataUtil.createDateWithTime(this.agendamento.dataInicial!, '08:00');
      this.horarioComercialFim = DataUtil.createDateWithTime(this.agendamento.dataInicial!, '17:40');
      this.agendamento.dataInicial = DataUtil.createDateWithTime(this.agendamento.dataInicial!, this.horaInicial);
      this.agendamento.dataFinal = DataUtil.createDateWithTime(this.agendamento.dataInicial!, this.horaFinal);
      // TODO verificar se a hora está dentro do intervalo de horário (08:00 as 17:40) por exemplo
      if (this.agendamento.dataInicial < this.horarioComercialInicio || (this.agendamento.dataInicial > this.horarioComercialFim)) {
        this.toastUtil.showMessage('error', 'Horário atendimento', 'O horário deve estar dentro do horário comercial');
        return;
      }
      // TODO se o cliente foi selecionado
      if (!this.agendamento.cliente.id) {
        this.toastUtil.showMessage('error', 'Cliente', 'O cliente é obrigatório');
        return;
      }
      // TODO se o médico foi selecionado
      if (!this.agendamento.especialista.id) {
        this.toastUtil.showMessage('error', 'Especialista', 'O especialista é obrigatório');
        return;
      }
      // Converte a data para o padrão que o fullcalendar aceita, antes de transformar em UTC.
      const dataInicial = DataUtil.formatDateToIso(this.agendamento.dataInicial);
      const dataFinal = DataUtil.formatDateToIso(this.agendamento.dataFinal);

      this.agendamento.dataInicial = DataUtil.createDateAsUTC(this.agendamento.dataInicial);
      this.agendamento.dataFinal = DataUtil.createDateAsUTC(this.agendamento.dataFinal);
      // TODO Salva o agendamento no Backend
      this.agendamentoService.save(this.agendamento).subscribe({
        next: agendamentoId => {
          this.toastUtil.showSuccessMessage('Salvando evento', 'Consulta salva com sucesso');
          this.calendarApi.unselect(); // clear date selection
          if (this.agendamento.id) {
            this.evento.setStart(dataInicial);
            this.evento.setEnd(dataFinal);
            this.evento.setProp('title', this.agendamento.cliente.nome);
          } else {
            this.calendarApi.addEvent({
              id: agendamentoId.id,
              title: this.agendamento.cliente.nome,
              start: dataInicial,
              end: dataFinal,
              allDay: this.agendamento.diaTodo
            });
          }
          this.showModal = false;
        },
        error: error => this.toastUtil.showErrorMessage(error, 'error', 'Cadastro de consulta')
      });
    } else {
      this.toastUtil.showMessage('error', 'Horário', 'A hora de início e de fim são obrigatórias');
    }
  }

  handleEventClick(clickInfo: EventClickArg): void {
    this.agendamentoService.findById(parseInt(clickInfo.event.id)).subscribe({
      next: agendamento => {
        this.agendamento = new Agendamento(agendamento);
        this.horaInicial = DataUtil.getTimeStringFromDate(this.agendamento.dataInicial!);
        this.horaFinal = DataUtil.getTimeStringFromDate(this.agendamento.dataFinal!);
        this.showModal = true;
        this.titulo = 'Editando agendamento';
      },
      error: error => this.toastUtil.showErrorMessage(error, 'error', 'Consultando consulta')
    })
    this.calendarApi = clickInfo.view.calendar;
    this.evento = clickInfo.event;
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  cancel() {
    this.showModal = false;
    this.agendamento = new Agendamento();
    this.horaInicial = null;
    this.horaFinal = null;
  }

  changeMonth(): void {
    this.agendamentoFilter.dataInicial = DataUtil.formatDateToIso(this.dataInicialSelecionada);
    this.agendamentoFilter.dataFinal = DataUtil.formatDateToIso(this.dataFinalSelecionada);
    if (!this.carregandoPagina) {
      this.findAgendamentos();
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir esta consulta?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.agendamentoService.delete(this.agendamento.id).subscribe({
          next: () => {
            this.evento.remove();
            this.toastUtil.showSuccessMessage('Exclusão consulta', 'Consulta excluída com sucesso');
            this.showModal = false;
          },
          error: error => {
            this.toastUtil.showErrorMessage(error, 'error', 'Exclusão consulta');
          }
        });
      },
      reject: (type: any) => {
        this.toastUtil.showMessage('warn', 'Exclusão consulta', 'Exclusão cancelada');
        this.showModal = false;
      }
    });
  }

  newClient(): void {
    this.cliente = new Cliente();
    this.showDialog = true;
  }

  closeDialog(event: boolean): void {
    this.showDialog = !event;
  }

  save(cliente: Cliente): void {
    this.cliente = cliente;
    this.clientes.push(this.cliente);
    this.showDialog = false;
  }

  delete(): void {
    if (this.agendamento.dataInicial! < new Date()) {
      this.toastUtil.showMessage('error', 'Exclusão de consulta', 'Não é permitido excluir consultas já passadas');
      return;
    }
    this.confirm();
  }
}
