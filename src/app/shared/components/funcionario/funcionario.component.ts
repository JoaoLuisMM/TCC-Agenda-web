import {Component, OnInit, PipeTransform} from '@angular/core';
import {Funcionario} from "../../../core/model/funcionario.model";
import {EspecialistaFilter} from "../../../core/service/especialista.service";
import {userRoles, Usuario} from "../../../seguranca/model/usuario.model";
import {FuncionarioService} from "../../../core/service/funcionario.service";
import {AuthService} from "../../../seguranca/service/auth.service";
import {ConfirmationService} from "primeng/api";
import {ToastUtil} from "../../util/toast-util";
import {Table, TableLazyLoadEvent} from "primeng/table";

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  filtro = new EspecialistaFilter();
  funcionario!: Funcionario;
  value!: String;
  titulo = 'Edição de funcionário';
  totalRegistros!: number;
  visible: boolean = false;
  permissoes = userRoles;
  papel!: any;
  usuarioLogado!: Usuario;

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private toastUtil: ToastUtil
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.carregaUsuarioLogado()!;
    this.findAll();
  }

  findAll(pagina?: number): void {
    if (pagina) { this.filtro.pagina = pagina }
    this.funcionarioService.findAll(this.filtro).subscribe({
      next: pageClientes => {
        this.funcionarios = Funcionario.toArray(pageClientes.content);
        this.totalRegistros = pageClientes.totalElements;
      },
      error: error => this.toastUtil.showErrorMessage(error, 'error', 'Consulta clientes')
    })
  }

  editMedico(funcionario: Funcionario): void {
    this.visible = true;
    this.funcionario = funcionario; //new Funcionario(funcionario);
    this.papel = {permissao: this.funcionario.papel};
  }

  novo(): void {
    this.funcionario = new Funcionario();
    this.titulo = 'Novo funcionário';
    this.visible = true;
  }

  aoMudarPagina(event: TableLazyLoadEvent) {
    if (event.first && event.rows) {
      const pagina = event.first / event.rows;
      // TODO chamar um método do backend para trazer os dados da página "pagina".
    }
  }

  updateSituacaoCliente(funcionario: Funcionario): void {
    let msg = `\nDeseja realmente ${funcionario.mensagemAtivacao} o funcionário '${funcionario.nome}'?\n`
    this.confirmationService.confirm({
      message: msg,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.funcionarioService.updateSituacao(funcionario.id).subscribe({
          next: () => {
            funcionario.inativo = !funcionario.inativo;
            this.toastUtil.showMessage('success','Situação do usuário', `Funcionário ${funcionario.situacao} com sucesso`);
          },
          error: error => this.toastUtil.showErrorMessage(error, 'error','Situação do usuário')
        })
      },
      reject: (type: any) => {
        this.toastUtil.showMessage('warn','Situação do usuário', 'Evento excluído com sucesso');
      }
    });
  }

  save(): void {
    if (this.funcionario) {
      if (!this.papel?.permissao) {
        this.toastUtil.showMessage('error', 'Permissão', 'A permissão é obrigatória');
        return;
      }
      this.funcionario.papel = this.papel.permissao;
      this.funcionarioService.save(this.funcionario).subscribe({
        next: cliente => {
          this.funcionario.id = cliente.id;
          this.visible = false;
          // this.closeDialog.emit(true);
          // this.saveOrUpdate.emit(this.cliente);
          this.toastUtil.showSuccessMessage('Salvando funcionário', 'Funcionário salvo com sucesso');
        },
        error: error => this.toastUtil.showErrorMessage(error, 'error', 'Salvando funcionário')
      });
    }
  }

  search(text: string, pipe: PipeTransform): Funcionario[] {
    return this.funcionarios.filter((medico) => {
      const term = text.toLowerCase();
      return (
        medico.nome.toLowerCase().includes(term) ||
        pipe.transform(medico.cpf).includes(term)
      );
    });
  }

  clear(table: Table) {
    table.clear();
  }

  hideDialog(): void {
    this.visible = false;
  }

  getDescricaoPermissao(papel: string): string {
    return this.permissoes.filter((p) => p.permissao === papel)[0].descricao;
  }

  isPodeAtivarInativar(funcionario: Funcionario): boolean {
    return funcionario && funcionario.id !== this.usuarioLogado.id;
  }
}
