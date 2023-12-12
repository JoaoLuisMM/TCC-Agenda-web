import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Agendamento} from "../model/agendamento.model";
import {Consulta} from "../../clinica-veterinaria/model/consulta.model";

export class AgendamentoFilter {
  cliente?: string;
  doutor?: string;
  dataInicial?: String | null;
  dataFinal?: String | null;
  pagina = 0;
  itensPorPagina = 10;

  constructor(json?: any) {
    if (json) {
      this.cliente = json.cliente;
      this.doutor = json.doutor;
      this.dataInicial = json.dataInicial;// ? new Date(json.dataInicial) : null;
      this.dataFinal = json.dataFinal;// ? new Date(json.dataFinal) : null;
    }
  }

  geraRestricoes(params: HttpParams): HttpParams {
    if (this.cliente) {
      params = params.append('cliente', this.cliente.toString());
    }
    if (this.doutor) {
      params = params.append('doutor', this.doutor.toString());
    }
    if (this.dataInicial) {
      params = params.append('dataInicial', this.dataInicial.toString());
    }
    if (this.dataFinal) {
      params = params.append('dataFinal', this.dataFinal.toString());
    }
    return params;
  }

}

export class AgendamentoPagina {
  content!: Agendamento[];
  totalElements!: number;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/agendamentos`;
  }

  save(agendamento: Agendamento): Observable<any> {
    if (agendamento.id) {
      return this.httpClient.put<any>(`${this.urlBackend}/${agendamento.id}`, agendamento);
    }
    return this.httpClient.post<any>(this.urlBackend, agendamento);
  }

  delete(agendamentoId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlBackend}/${agendamentoId}`);
  }

  findById(agendamentoId: number): Observable<Agendamento> {
    return this.httpClient.get<Agendamento>(`${this.urlBackend}/${agendamentoId}`);
  }

  findToDashboard(filter: AgendamentoFilter): Observable<Agendamento[]> {
    let params = new HttpParams();
    params = filter.geraRestricoes(params);
    return this.httpClient.get<Agendamento[]>(`${this.urlBackend}/dashboard`, {params});
  }

  findToConsulta(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(`${this.urlBackend}/consultas-do-dia`);
  }

  findToConsultaVeterinaria(): Observable<Consulta[]> {
    return this.httpClient.get<Consulta[]>(`${this.urlBackend}/veterinaria/consultas-do-dia`);
  }

  findAll(filter: AgendamentoFilter): Observable<AgendamentoPagina> {
    let params = new HttpParams();
    params = params.append('page', filter.pagina.toString());
    params = params.append('size', filter.itensPorPagina.toString());
    params = filter.geraRestricoes(params);
    return this.httpClient.get<AgendamentoPagina>(`${this.urlBackend}`, {params});
  }
}
