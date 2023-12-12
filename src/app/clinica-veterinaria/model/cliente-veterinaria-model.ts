import {Especie} from "./especie-model";

export class ClienteVeterinaria {
  id!: number;
  nome!: string;
  especie!: Especie;
  dataNascimento!: Date | null;
  raca!: string;
  sexo!: string;
  // Tutor
  nomeTutor!: string;
  cpf!: string | null;
  email!: string;
  celular!: string | null;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.dataNascimento = json.dataNascimento ? new Date(json.dataNascimento + 'T00:00:00') : null;
      this.raca = json.raca;
      this.sexo = json.sexo;
      this.especie = json.especie;
      //
      this.nomeTutor = json.nomeTutor;
      this.cpf = json.cpf;
      this.email = json.email;
      this.celular = json.celular;
    }
  }

  static of(json?: ClienteVeterinaria): ClienteVeterinaria {
    const copy = new ClienteVeterinaria();
    if (json) {
      copy.id = json.id;
      copy.nome = json.nome;
      copy.dataNascimento = json.dataNascimento;
      copy.raca = json.raca;
      copy.sexo = json.sexo;
      copy.especie = json.especie;
      //
      copy.nomeTutor = json.nomeTutor;
      copy.cpf = json.cpf;
      copy.email = json.email;
      copy.celular = json.celular;
    }
    return copy;
  }

  static toArray(jsons: any[]): ClienteVeterinaria[] {
    const penalidades: ClienteVeterinaria[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        penalidades.push(new ClienteVeterinaria(json));
      }
    }
    return penalidades;
  }

  get cpfFormatado(): string {
    if (this.cpf) {
      return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return '';
  }
}
