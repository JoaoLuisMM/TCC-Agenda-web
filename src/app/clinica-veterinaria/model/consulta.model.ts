import {StringUtils} from "../../shared/lib/string-utils";
import {DataUtil} from "../../shared/lib/data-util";

export class ClienteVeterinaria {
  id!: number;
  nome!: string;
  email!: string;
  tutor!: Tutor;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.email = json.email;
      this.tutor = new Tutor(json.tutor);
    }
  }

  static toArray(jsons?: any): ClienteVeterinaria[] {
    const clientes: ClienteVeterinaria[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        clientes.push(new ClienteVeterinaria(json));
      }
    }
    return clientes;
  }
}

export class Tutor {
  id!: number;
  nome!: string;
  email!: string;
  celular!: string;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.email = json.email;
      this.celular = json.celular;
    }
  }
}

export class Consulta {
  id!: number;
  cliente!: ClienteVeterinaria;
  situacao!: string;
  dataInicial!: Date | null;
  dataFinal!: Date | null;
  readonly diaTodo = false;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.cliente = new ClienteVeterinaria(json.cliente);
      this.situacao = json.situacao;
      this.dataInicial = json.dataInicial ? new Date(json.dataInicial) : null;
      this.dataFinal = json.dataFinal ? new Date(json.dataFinal) : null;
    }
  }

  static toArray(jsons: any[]): Consulta[] {
    const penalidades: Consulta[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        penalidades.push(new Consulta(json));
      }
    }
    return penalidades;
  }

  static of(event: any): Consulta {
    const novo = new Consulta();
    novo.id = event.id;
    novo.cliente = new ClienteVeterinaria({id: event.extendedProps!['clienteId']})
    novo.dataInicial = DataUtil.createDateAsUTC(event.start);
    novo.dataFinal = event.end ? DataUtil.createDateAsUTC(event.end) : null;
    return novo;
  }

  dataInicialConvertida(): string {
    if (this.dataInicial) {
      const data = this.dataInicial.toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
      return data+'T'+StringUtils.padLeft(this.dataInicial.getHours()) + ':'
        + StringUtils.padLeft(this.dataInicial.getMinutes()) + ':'
        + StringUtils.padLeft(this.dataInicial.getSeconds());
    }
    return '';
  }

  dataFinalConvertida(): string {
    if (this.dataFinal) {
      const data = this.dataFinal.toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
      return data+'T'+StringUtils.padLeft(this.dataFinal.getHours()) + ':'
        + StringUtils.padLeft(this.dataFinal.getMinutes()) + ':'
        + StringUtils.padLeft(this.dataFinal.getSeconds());
    }
    return '';
  }
}
