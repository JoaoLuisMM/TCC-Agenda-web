import {Component, OnInit, PipeTransform} from '@angular/core';
import {Table, TableLazyLoadEvent} from "primeng/table";
import {Funcionario} from "../../../core/model/funcionario.model";
import {userRoles, Usuario} from "../../../seguranca/model/usuario.model";
import {ToastUtil} from "../../../shared/util/toast-util";

@Component({
  selector: 'app-medicos',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  medico!: Funcionario;
  value!: String;
  titulo = 'Edição de medico';
  totalRegistros!: number;
  visible: boolean = false;
  permissoes = userRoles;

  constructor(
    private toast: ToastUtil
  ) {}

  ngOnInit(): void {
    this.totalRegistros = this.MEDICOS.length;
  }

  editMedico(medico: Funcionario): void {
    this.visible = true;
    this.medico = new Funcionario(medico);
  }

  novo(): void {
    this.medico = new Funcionario();
    this.visible = true;
  }

  aoMudarPagina(event: TableLazyLoadEvent) {
    if (event.first && event.rows) {
      const pagina = event.first / event.rows;
      // TODO chamar um método do backend para trazer os dados da página "pagina".
    }
  }

  save(): void {
    if (this.medico && this.medico.id) {
      const index = this.MEDICOS.findIndex((c) => c.id === this.medico.id);
      if (index > -1) {
        this.MEDICOS[index] = this.medico;
      }
    } else {
      this.MEDICOS.push(this.medico);
    }
    this.visible = false;
  }

  MEDICOS: Funcionario[] = [
    new Funcionario({
      id: 1,
      nome: 'Administrador',
      cpf: '548.959.940-58',
      email: 'medico@email.com',
      celular: '48977348422',
      inativo: false,
      papel: 'ROLE_ADMINISTRADOR'
    }),
    new Funcionario({
      id: 2,
      nome: 'Recepcionista 1',
      cpf: '548.959.940-58',
      email: 'medico@email.com',
      celular: '48977348422',
      inativo: false,
      papel: 'ROLE_RECEPCIONISTA'
    }),
    new Funcionario({
      id: 3,
      nome: 'Recepcionista 1',
      cpf: '548.959.940-58',
      email: 'medico@email.com',
      celular: '48977348422',
      inativo: false,
      papel: 'ROLE_RECEPCIONISTA'
    }),
    new Funcionario({
      id: 4,
      nome: 'Médico',
      cpf: '548.959.940-58',
      email: 'medico@email.com',
      celular: '48977348422',
      inativo: false,
      papel: 'ROLE_OPERACIONAL'
    })
  ];

  search(text: string, pipe: PipeTransform): Funcionario[] {
    return this.MEDICOS.filter((medico) => {
      const term = text.toLowerCase();
      return (
        medico.nome.toLowerCase().includes(term) ||
        pipe.transform(medico.cpf).includes(term)
      );
    });
  }

  updateSituacaoCliente(funcionario: Funcionario): void {
    this.toast.showMessage('warn', 'Ativar/Inativar cliente', 'Implementação pendente');
  }

  clear(table: Table) {
    table.clear();
  }

  getDescricaoPermissao(papel: string): string {
    return this.permissoes.filter((p) => p.permissao === papel)[0].descricao;
  }

  isPodeAtivarInativar(funcionario: Funcionario): boolean {
    return funcionario && funcionario.id !== 1;
  }
}
