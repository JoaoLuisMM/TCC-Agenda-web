import {Component, PipeTransform, ViewChild} from '@angular/core';
import {Table, TableLazyLoadEvent} from "primeng/table";
import {Cliente} from "../../../core/model/cliente.model";
import {ActivatedRoute} from "@angular/router";
import {ClienteVeterinaria} from "../../../clinica-veterinaria/model/cliente-veterinaria-model";
import {ToastUtil} from "../../../shared/util/toast-util";

@Component({
  selector: 'app-clientes',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  templateId!: string;
  dadosTemplate = new Map<string, any>();
  dados: any[] = [];
  // Clientes de clinicas médicas, escritórios advocacia, etc.
  cliente!: Cliente;
  // Quando o template for de uma veterinária
  clienteVeterinaria!: ClienteVeterinaria;
  showDialogAnimal: boolean = false;

  value!: String;
  titulo = 'Edição de cliente';
  totalRegistros!: number;
  visible: boolean = false;
  @ViewChild('dataTableClientes')
  tabela!: Table;

  constructor(
    private toast: ToastUtil,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dadosTemplate.set('1', this.CLIENTES);
    this.dadosTemplate.set('2', this.ANIMAIS);
    this.dadosTemplate.set('3', this.ANIMAIS);
    this.dadosTemplate.set('4', this.ANIMAIS);
    this.templateId = this.activatedRoute.snapshot.params['id'];
    if (!this.templateId) {
      this.templateId = '1';
    }
    this.dados = this.dadosTemplate.get(this.templateId);
    this.totalRegistros = this.dados.length;
  }

  editCliente(cliente: Cliente): void {
    this.visible = true;
    this.titulo = 'Edição de cliente';
    this.cliente = new Cliente(cliente);
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
    this.titulo = "Novo cliente";
    this.visible = true;
  }

  aoMudarPagina(event: TableLazyLoadEvent) {
    if (event.first && event.rows) {
      const pagina = event.first / event.rows;
      // TODO chamar um método do backend para trazer os dados da página "pagina".
    }
  }

  save(): void {
    if (this.cliente && this.cliente.id) {
      const index = this.CLIENTES.findIndex((c) => c.id === this.cliente.id);
      if (index > -1) {
        this.CLIENTES[index] = this.cliente;
      }
    } else {
      this.CLIENTES.push(this.cliente);
      this.visible = false;
      this.clear(this.tabela);
    }
    this.visible = false;
  }

  ANIMAIS: ClienteVeterinaria[] = [
    new ClienteVeterinaria({
      id: 1,
      nome: 'Spike',
      dataNascimento: '2017-06-23',
      cpf: '775.353.470-02',
      especie: 'Cachorro',
    }), new ClienteVeterinaria({
      id: 2,
      nome: 'Lívia',
      dataNascimento: '2020-10-03',
      cpf: '548.959.940-58',
      especie: 'Cachorro',
    }), new ClienteVeterinaria({
      id: 3,
      nome: 'Baguera',
      dataNascimento: '2019-05-19',
      cpf: '138.368.990-35',
      especie: 'Gato',
    }), new ClienteVeterinaria({
      id: 4,
      nome: 'Gato',
      dataNascimento: '2018-01-29',
      cpf: '413.822.200-65',
      especie: 'Cachorro',
    })
  ];

  CLIENTES: Cliente[] = [
    new Cliente({
      id: 1,
      cpf: '775.353.470-02',
      nome: 'Ignácio',
      dataNascimento: new Date('1999/11/12'),
      email: null,
      celular: null,
      rua: null,
      numero: null,
      complemento: null,
      cep: null,
      bairro: null,
      cidade: null,
      inativo: false
    }), new Cliente({
      id: 2,
      cpf: '548.959.940-58',
      nome: 'Ryan',
      dataNascimento: new Date('01/01/2001'),
      email: null,
      celular: null,
      rua: null,
      numero: null,
      complemento: null,
      cep: null,
      bairro: null,
      cidade: null,
      inativo: false
    }), new Cliente({
      id: 3,
      cpf: '138.368.990-35',
      nome: 'Laynara',
      dataNascimento: new Date('2000/10/11'),
      email: null,
      celular: null,
      rua: null,
      numero: null,
      complemento: null,
      cep: null,
      bairro: null,
      cidade: null,
      inativo: false
    }), new Cliente({
      id: 4,
      cpf: '413.822.200-65',
      nome: 'Fábio',
      dataNascimento: new Date('2001/07/08'),
      email: null,
      celular: null,
      rua: null,
      numero: null,
      complemento: null,
      cep: null,
      bairro: null,
      cidade: null,
      inativo: false
    })
  ];

  search(text: string, pipe: PipeTransform): Cliente[] {
    return this.CLIENTES.filter((cliente) => {
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

  // Veterinária
  novoAnimal(): void {
    this.clienteVeterinaria = new ClienteVeterinaria();
    this.titulo = "Novo cliente";
    this.showDialogAnimal = true;
  }

  editAnimal(animal: ClienteVeterinaria): void {
    this.clienteVeterinaria = ClienteVeterinaria.of(animal);
    this.titulo = "Edição de cliente";
    this.showDialogAnimal = true;
  }

  saveAnimal(): void {
    if (this.clienteVeterinaria && this.clienteVeterinaria.id) {
      const index = this.ANIMAIS.findIndex((c) => c.id === this.clienteVeterinaria.id);
      if (index > -1) {
        this.ANIMAIS[index] = this.clienteVeterinaria;
      }
    } else {
      this.ANIMAIS.push(this.clienteVeterinaria);
      this.clear(this.tabela);
    }
    this.showDialogAnimal = false;
  }
}
