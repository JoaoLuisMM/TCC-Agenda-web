export class Cliente {
  id!: number;
  cpf!: string;
  nome!: string;
  dataNascimento!: Date | null;
  email!: string | null;
  celular: string | null;
  rua!: string | null;
  numero!: string | null;
  complemento!: string | null;
  cep: string | null;
  bairro!: string | null;
  cidade!: string | null;
  inativo = false;

  constructor(json?: any) {
    this.celular = null;
    this.cep = null;
    if (json) {
      this.id = json.id;
      this.cpf = json.cpf;
      this.nome = json.nome;
      this.email = json.email;
      this.dataNascimento = json.dataNascimento ? new Date(json.dataNascimento) : null;
      this.celular = json.celular;
      this.rua = json.rua;
      this.numero = json.numero;
      this.complemento = json.complemento;
      this.cep = json.cep;
      this.bairro = json.bairro;
      this.cidade = json.cidade;
      this.inativo = json.inativo;
    }
  }

  static toArray(jsons?: any): Cliente[] {
    const clientes: Cliente[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        clientes.push(new Cliente(json));
      }
    }
    return clientes;
  }

  get cpfFormatado(): string {
    if (this.cpf) {
      return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return '';
  }
}
