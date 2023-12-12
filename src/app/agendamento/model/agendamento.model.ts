import {StringUtils} from "../../shared/lib/string-utils";
import {DataUtil} from "../../shared/lib/data-util";
import {ClienteAgendamento} from "./cliente-agendamento.model";

export class Especialista {
  id!: number;
  nome!: string;
  email!: string;
  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.nome;
      this.email = json.email;
    }
  }

  static toArray(jsons?: any): Especialista[] {
    const clientes: Especialista[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        clientes.push(new Especialista(json));
      }
    }
    return clientes;
  }
}

//{
// "allDay":false,"title":"Cliente clinica médica","start":"2023-10-12T09:15:00-03:00",
// "end":"2023-10-12T10:00:00-03:00","id":"1","extendedProps":{"clienteId":1,"doutorId":1}
// }
export class Agendamento {
  id!: number;
  cliente!: ClienteAgendamento;
  especialista!: Especialista;
  situacao!: string;
  dataInicial!: Date | null;
  dataFinal!: Date | null;
  readonly diaTodo = false;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.cliente = new ClienteAgendamento(json.cliente);
      this.especialista = new Especialista(json.especialista);
      this.situacao = json.situacao;
      this.dataInicial = json.dataInicial ? new Date(json.dataInicial) : null;
      this.dataFinal = json.dataFinal ? new Date(json.dataFinal) : null;
    }
  }

  static toArray(jsons: any[]): Agendamento[] {
    const penalidades: Agendamento[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        penalidades.push(new Agendamento(json));
      }
    }
    return penalidades;
  }

  static of(event: any): Agendamento {
    const novo = new Agendamento();
    novo.id = event.id;
    novo.cliente = new ClienteAgendamento({id: event.extendedProps!['clienteId']})
    novo.especialista = new Especialista({id: event.extendedProps!['doutorId']})
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
