import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Funcionario} from "../model/funcionario.model";

export class FuncionarioFilter {
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

export class FuncionarioPagina {
  content!: Funcionario[];
  totalElements!: number;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/funcionarios`;
  }

  save(funcionario: Funcionario): Observable<any> {
    if (funcionario.id) {
      return this.httpClient.put<any>(`${this.urlBackend}/${funcionario.id}`, funcionario);
    }
    return this.httpClient.post<any>(this.urlBackend, funcionario);

  }

  updateSituacao(funcionarioId: number): Observable<void> {
    return this.httpClient.patch<void>(`${this.urlBackend}/${funcionarioId}/situacao`, {});
  }

  findAll(filter: FuncionarioFilter): Observable<FuncionarioPagina> {
    let params = new HttpParams();
    params = params.append('page', filter.pagina.toString());
    params = params.append('size', filter.itensPorPagina.toString());
    params = filter.geraRestricoes(params);
    return this.httpClient.get<FuncionarioPagina>(`${this.urlBackend}`, {params});
  }
}
