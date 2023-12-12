import {StringUtils} from "../../shared/lib/string-utils";
import {DataUtil} from "../../shared/lib/data-util";
import {ClienteAgendamento} from "../../agendamento/model/cliente-agendamento.model";

export class Advogado {
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

  static toArray(jsons?: any): Advogado[] {
    const advogados: Advogado[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        advogados.push(new Advogado(json));
      }
    }
    return advogados;
  }
}

export class AgendamentoAdvocaticio {
  id!: number;
  cliente!: ClienteAgendamento;
  advogado!: Advogado;
  numeroProcesso!: string;
  tipoCompromisso!: string;
  comarca!: string;
  situacao!: string;
  dataInicial!: Date | null;
  dataFinal!: Date | null;
  readonly diaTodo = false;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.cliente = new ClienteAgendamento(json.cliente);
      this.advogado = new Advogado(json.especialista);
      this.numeroProcesso = json.numeroProcesso;
      this.tipoCompromisso = json.tipoCompromisso;
      this.comarca = json.comarca;
      this.situacao = json.situacao;
      this.dataInicial = json.dataInicial ? new Date(json.dataInicial) : null;
      this.dataFinal = json.dataFinal ? new Date(json.dataFinal) : null;
    }
  }

  static toArray(jsons: any[]): AgendamentoAdvocaticio[] {
    const penalidades: AgendamentoAdvocaticio[] = [];
    if (jsons != null) {
      for (const json of jsons) {
        penalidades.push(new AgendamentoAdvocaticio(json));
      }
    }
    return penalidades;
  }

  static of(event: any): AgendamentoAdvocaticio {
    const novo = new AgendamentoAdvocaticio();
    novo.id = event.id;
    novo.cliente = new ClienteAgendamento({id: event.extendedProps!['clienteId']})
    novo.advogado = new Advogado({id: event.extendedProps!['doutorId']})
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
