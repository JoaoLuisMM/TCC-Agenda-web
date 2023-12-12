export class Funcionario {
  id!: number;
  nome!: string;
  cpf!: string;
  email!: string;
  celular!: string;
  inativo = false;
  papel!: string;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.cpf = json.cpf;
      this.email = json.email;
      this.celular = json.celular;
      this.inativo = json.inativo;
      this.papel = json.papel;
    }
  }

  static toArray(jsons?: any): Funcionario[] {
    const funcionarios: Funcionario[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        funcionarios.push(new Funcionario(json));
      }
    }
    return funcionarios;
  }

  get situacao(): string {
    return this.inativo ? 'Inativo' : 'Ativo'
  }

  get mensagemAtivacao(): string {
    return this.inativo ? 'ativar' : 'inativar'
  }
}
