import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Empresa} from "../model/empresa.model";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/empresas`;
  }

  save(empresa: Empresa): Observable<any> {
    return this.httpClient.post<any>(`${this.urlBackend}/novo-cadastro`, empresa);
  }

  findById(id: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(`${this.urlBackend}/${id}`);
  }
}
