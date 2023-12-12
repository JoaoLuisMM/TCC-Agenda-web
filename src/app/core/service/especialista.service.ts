import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Especialista} from "../../agendamento/model/agendamento.model";

export class EspecialistaFilter {
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

export class EspecialistaPagina {
  content!: Especialista[];
  totalElements!: number;
}

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/especialistas`;
  }

  findMedicosAgendamento(): Observable<Especialista[]> {
    return this.httpClient.get<Especialista[]>(`${this.urlBackend}/to-agendamento`);
  }
}
