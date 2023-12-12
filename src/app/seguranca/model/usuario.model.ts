import {Empresa} from "../../empresa/model/empresa.model";

// export const userRoles = ['ROLE_ADMINISTRADOR', 'ROLE_OPERACIONAL', 'ROLE_RECEPCIONISTA'];
export const userRoles = [{
  permissao: null, descricao: 'Escolha a permissão'
}, {
  permissao: 'ROLE_ADMINISTRADOR', descricao: 'Administrador'
}, {
  permissao: 'ROLE_OPERACIONAL', descricao: 'Operacional'
}, {
  permissao: 'ROLE_RECEPCIONISTA', descricao: 'Recepcionista'
}];

export class Usuario {
  id!: number;
  nome!: string;
  username!: string;
  cpf!: string;
  empresa!: Empresa;
  permissao!: string;
  inativo = false;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.cpf = json.cpf;
      this.empresa = new Empresa(json.empresa);
      this.permissao = json.permissao;
    }
  }

  temPermissao(permissao: string) {
    return this.permissao === permissao;
  }

  isOperacional(): boolean {
    if (this.isAdministrador()) {
      return true;
    }
    return this.temPermissao('ROLE_OPERACIONAL');
  }

  isRecepcionista(): boolean {
    if (this.isAdministrador()) {
      return true;
    }
    return this.temPermissao('ROLE_RECEPCIONISTA');
  }

  isAdministrador(): boolean {
    return this.temPermissao('ROLE_ADMINISTRADOR');
  }

  get situacao(): string {
    return this.inativo ? 'Sim' : 'Não'
  }
}
