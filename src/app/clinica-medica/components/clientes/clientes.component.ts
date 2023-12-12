import { Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import {Cliente} from "../../../core/model/cliente.model";
import {ClienteFilter, ClienteService} from "../../../core/service/cliente.service";
import {ToastUtil} from "../../../shared/util/toast-util";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  filtro = new ClienteFilter();
  cliente = new Cliente();
  value!: String;
  totalRegistros!: number;
  showDialog: boolean = false;
  @ViewChild('dataTableClientes')
  tabela!: Table;

  constructor(
    private clienteService: ClienteService,
    private toast: ToastUtil
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(pagina?: number): void {
    if (pagina) { this.filtro.pagina = pagina }
    this.clienteService.findAll(this.filtro).subscribe({
      next: pageClientes => {
        this.clientes = Cliente.toArray(pageClientes.content);
        this.totalRegistros = pageClientes.totalElements;
      },
      error: error => this.toast.showErrorMessage(error, 'error', 'Consulta clientes')
    })

  }

  editCliente(cliente: Cliente): void {
    this.clienteService.findById(cliente.id).subscribe({
      next: cliente => this.cliente = new Cliente(cliente),
      error: error => this.toast.showErrorMessage(error, 'error', 'Consultando dados do usuário')
    });
    this.showDialog = true;
  }

  updateSituacaoCliente(cliente: Cliente): void {
    this.toast.showMessage('warn', 'Ativar/Inativar cliente', 'Implementação pendente');
    // this.clienteService.findById(cliente.id).subscribe({
    //   next: cliente => this.cliente = new Cliente(cliente),
    //   error: error => this.toast.showErrorMessage(error, 'error', 'Consultando dados do usuário')
    // });
    // this.showDialog = true;
  }

  novo(): void {
    this.cliente = new Cliente();
    this.showDialog = true;
  }

  closeDialog(event: boolean): void {
    this.showDialog = !event;
  }

  aoMudarPagina(event: TableLazyLoadEvent) {
    if (event.first && event.rows) {
      const pagina = event.first / event.rows;
      this.findAll(pagina);
    }
  }

  save(cliente: Cliente): void {
    this.cliente = cliente;
    this.showDialog = false;
    this.findAll(0);
  }

  search(text: string, pipe: PipeTransform): Cliente[] {
    return this.clientes.filter((cliente) => {
      const term = text.toLowerCase();
      return (
        cliente.nome.toLowerCase().includes(term) ||
        pipe.transform(cliente.cpf).includes(term)
      );
    });
  }

  clear(table: Table) {
    table.clear();
  }
}
