import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente.model";
import {ClienteAgendamento} from "../../agendamento/model/cliente-agendamento.model";

export class ClienteFilter {
  id?: number;
  nome?: string;
  inativo?: boolean;
  pagina = 0;
  itensPorPagina = 10;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.nome = json.cliente;
    }
  }

  geraRestricoes(params: HttpParams): HttpParams {
    if (this.id) {
      params = params.append('id', this.id.toString());
    }
    if (this.nome) {
      params = params.append('nome', this.nome);
    }
    if (this.inativo) {
      params = params.append('inativo', this.inativo.toString());
    }
    return params;
  }
}

export class ClientePagina {
  content!: Cliente[];
  totalElements!: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/clientes`;
  }

  save(cliente: Cliente): Observable<any> {
    if (cliente.id) {
      return this.httpClient.put<any>(`${this.urlBackend}/${cliente.id}`, cliente);
    }
    return this.httpClient.post<any>(this.urlBackend, cliente);
  }

  findAll(filter: ClienteFilter): Observable<ClientePagina> {
    let params = new HttpParams();
    params = params.append('page', filter.pagina.toString());
    params = params.append('size', filter.itensPorPagina.toString());
    params = filter.geraRestricoes(params);
    return this.httpClient.get<ClientePagina>(`${this.urlBackend}`, {params});
  }

  findById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.urlBackend}/${id}`);
  }

  findClientesAgendamento(): Observable<ClienteAgendamento[]> {
    return this.httpClient.get<ClienteAgendamento[]>(`${this.urlBackend}/to-agendamento`);
  }
}
