import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Advogado, AgendamentoAdvocaticio} from "../model/agendamento-advocaticio.model";
import {AgendamentoFilter} from "../../agendamento/service/agendamento.service";
import {ClienteAgendamento} from "../../agendamento/model/cliente-agendamento.model";

class AgendamentoAdvocaticioIn {
  id!: number;
  cliente!: ClienteAgendamento;
  especialista!: Advogado;
  numeroProcesso!: string;
  tipoCompromisso!: string;
  comarca!: string;
  situacao!: string;
  dataInicial!: Date | null;
  dataFinal!: Date | null;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.cliente = new ClienteAgendamento(json.cliente);
      this.especialista = new Advogado(json.advogado);
      this.numeroProcesso = json.numeroProcesso;
      this.tipoCompromisso = json.tipoCompromisso;
      this.comarca = json.comarca;
      this.situacao = json.situacao;
      this.dataInicial = json.dataInicial ? new Date(json.dataInicial) : null;
      this.dataFinal = json.dataFinal ? new Date(json.dataFinal) : null;
    }
  }
  static of(agendamento: AgendamentoAdvocaticio): AgendamentoAdvocaticioIn {
    return new AgendamentoAdvocaticioIn(agendamento)
  }
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoAdvocaticioService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/agendamentos-advocaticios`;
  }

  save(agendamento: AgendamentoAdvocaticio): Observable<any> {
    const novoAgendamento = AgendamentoAdvocaticioIn.of(agendamento);
    if (agendamento.id) {
      return this.httpClient.put<any>(`${this.urlBackend}/${agendamento.id}`, novoAgendamento);
    }
    return this.httpClient.post<any>(this.urlBackend, novoAgendamento);
  }

  findById(agendamentoId: number): Observable<AgendamentoAdvocaticio> {
    return this.httpClient.get<AgendamentoAdvocaticio>(`${this.urlBackend}/${agendamentoId}`);
  }

  findToDashboard(filter: AgendamentoFilter): Observable<AgendamentoAdvocaticio[]> {
    let params = new HttpParams();
    params = filter.geraRestricoes(params);
    return this.httpClient.get<AgendamentoAdvocaticio[]>(`${this.urlBackend}/dashboard`, {params});
  }

  findToConsulta(): Observable<AgendamentoAdvocaticio[]> {
    return this.httpClient.get<AgendamentoAdvocaticio[]>(`${this.urlBackend}/consultas-do-dia`);
  }
}
