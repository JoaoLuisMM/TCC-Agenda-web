import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ClienteVeterinaria} from "../model/cliente-veterinaria-model";
import {Especie} from "../model/especie-model";

@Injectable({
  providedIn: 'root'
})
export class EspecieClienteService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/clinica-veterinaria/especies`;
  }

  save(cliente: ClienteVeterinaria): Observable<any> {
    if (cliente.id) {
      return this.httpClient.put<any>(`${this.urlBackend}/${cliente.id}`, cliente);
    }
    return this.httpClient.post<any>(this.urlBackend, cliente);
  }

  findAll(): Observable<Especie[]> {
    return this.httpClient.get<Especie[]>(`${this.urlBackend}`);
  }

  findById(id: number): Observable<ClienteVeterinaria> {
    return this.httpClient.get<ClienteVeterinaria>(`${this.urlBackend}/${id}`);
  }
}
