import {Component, EventEmitter, Input, OnInit, Output, PipeTransform, ViewChild} from '@angular/core';
import {Table, TableLazyLoadEvent} from 'primeng/table';
import {ClienteVeterinaria} from "../../model/cliente-veterinaria-model";
import {ToastUtil} from "../../../shared/util/toast-util";
import {ClienteFilter, ClienteService} from "../../service/cliente.service";
import {EspecieClienteService} from "../../service/especie-cliente.service";
import {Cliente} from "../../../core/model/cliente.model";

@Component({
  selector: 'app-cliente-veterinaria',
  templateUrl: './cliente-veterinaria.component.html',
  styleUrls: ['./cliente-veterinaria.component.css']
})
export class ClienteVeterinariaComponent implements OnInit{
  clientes: ClienteVeterinaria[] = [];
  cliente!: ClienteVeterinaria;
  filtro = new ClienteFilter();

  titulo = 'Edição de cliente';
  totalRegistros!: number;
  @Input()
  visible: boolean = false;

  showDialog: boolean = false;
  @ViewChild('dataTableAnimais')
  tabela!: Table;

  constructor(
    private clienteService: ClienteService,
    private especieClienteService: EspecieClienteService,
    private toast: ToastUtil
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(pagina?: number): void {
    if (pagina) { this.filtro.pagina = pagina }
    this.clienteService.findAll(this.filtro).subscribe({
      next: pageClientes => {
        this.clientes = ClienteVeterinaria.toArray(pageClientes.content);
        this.totalRegistros = pageClientes.totalElements;
      },
      error: error => this.toast.showErrorMessage(error, 'error', 'Consulta clientes')
    })

  }

  editCliente(cliente: ClienteVeterinaria): void {
    this.clienteService.findById(cliente.id).subscribe({
      next: cliente => {
        this.cliente = new ClienteVeterinaria(cliente);
        this.showDialog = true;
      },
      error: error => this.toast.showErrorMessage(error, 'error', 'Pesquisando dados do cliente')
    })
  }

  novoCliente(): void {
    this.cliente = new ClienteVeterinaria();
    this.showDialog = true;
  }

  closeDialog(event: boolean): void {
    this.showDialog = !event;
  }

  aoMudarPagina(event: TableLazyLoadEvent) {
    if (event.first && event.rows) {
      const pagina = event.first / event.rows;
      // TODO chamar um método do backend para trazer os dados da página "pagina".
    }
  }

  save(cliente: ClienteVeterinaria): void {
    this.cliente = cliente;
    this.showDialog = false;
    this.findAll(0);
  }

  updateSituacaoCliente(cliente: ClienteVeterinaria): void {
    // let msg = `\nDeseja realmente ${cliente.mensagemAtivacao} o funcionário '${cliente.nome}'?\n`
    // this.confirmationService.confirm({
    //   message: msg,
    //   header: 'Confirmação',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.funcionarioService.updateSituacao(funcionario.id).subscribe({
    //       next: () => {
    //         funcionario.inativo = !funcionario.inativo;
    //         this.toastUtil.showMessage('success','Situação do usuário', `Funcionário ${funcionario.situacao} com sucesso`);
    //       },
    //       error: error => this.toastUtil.showErrorMessage(error, 'error','Situação do usuário')
    //     })
    //   },
    //   reject: (type: any) => {
    //     this.toastUtil.showMessage('warn','Situação do usuário', 'Evento excluído com sucesso');
    //   }
    // });
  }

  search(text: string, pipe: PipeTransform): ClienteVeterinaria[] {
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
