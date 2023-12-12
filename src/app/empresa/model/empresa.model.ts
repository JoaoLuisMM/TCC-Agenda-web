export class Responsavel {
  nome!: string;
  cpf!: string;
  senha!: string;

  constructor(json?: any) {
    if (json) {
      this.nome = json.nome;
      this.cpf = json.cpf;
      this.senha = json.senha;
    }
  }
}

export class Empresa {
  id!: number;
  nome!: string;
  tipoPessoa!: string;
  cnpjCpf!: string;
  celular!: string | null;
  telefone!: string | null;
  email!: string | null;
  ramoAtividade!: string;
  responsavel = new Responsavel();

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.tipoPessoa = json.tipoPessoa;
      this.cnpjCpf = json.cnpjCpf;
      this.celular = json.celular;
      this.telefone = json.telefone;
      this.email = json.email;
      this.ramoAtividade = json.ramoAtividade;
      this.responsavel = new Responsavel(json.responsavel);
    }
  }

  get pessoaJuridica(): boolean {
    return this.tipoPessoa === 'PESSOA_JURIDICA';
  }

  get descricaoTipo(): string {
    if (this.pessoaJuridica) {
      return 'Pessoa Jurídica';
    }
    return 'Possoa Física';
  }

  //CLINICA_MEDICA, CLINICA_VETERINARIA, CONTRATO_SERVICO, ENTREVISTA_EMPREGO
  get rotaDefault(): string {
    if (this.ramoAtividade) {
      if (this.ramoAtividade === 'CLINICA_MEDICA') {
        return 'clinica-medica';
      } else if (this.ramoAtividade === 'CLINICA_VETERINARIA') {
        return 'clinica-veterinaria';
      } else if (this.ramoAtividade === 'CONTRATO_SERVICO') {
        return 'escritorio-advocacia';
      }
    }
    return '';
  }

  get paginaPrincipal(): string {
    if (this.ramoAtividade) {
      if (this.ramoAtividade === 'CLINICA_MEDICA') {
        return 'consulta';
      } else if (this.ramoAtividade === 'CLINICA_VETERINARIA') {
        return 'consulta';
      } else if (this.ramoAtividade === 'CONTRATO_SERVICO') {
        return 'atendimentos';
      }
    }
    return '';
  }
}
