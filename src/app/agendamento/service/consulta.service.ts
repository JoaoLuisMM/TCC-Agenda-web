import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

export class ObservacaoConsulta {
  observacoes = '';
}

export class HistoricoConsulta {
  clienteId!: number;
  nome!: string;
  historico: string[] = [];

  constructor(json?: any) {
    if (json) {
      this.clienteId = json.clienteId;
      this.nome = json.nome;
      this.historico = json.historico;
    }
  }

  mensagens(): string {
    return this.historico.join("\n--------------------------\n");
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/clientes`;
  }

  save(clienteId: number, consulta: ObservacaoConsulta): Observable<any> {
    return this.httpClient.post<any>(`${this.urlBackend}/${clienteId}/consultas`, consulta);
  }

  findById(clienteId: number): Observable<HistoricoConsulta> {
    return this.httpClient.get<HistoricoConsulta>(`${this.urlBackend}/${clienteId}/consultas`);
  }
}
