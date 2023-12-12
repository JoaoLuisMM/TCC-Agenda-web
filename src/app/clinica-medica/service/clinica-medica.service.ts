import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Empresa} from "../../empresa/model/empresa.model";

@Injectable({
  providedIn: 'root'
})
export class ClinicaMedicaService {

  urlBackend: string;

  constructor(private httpClient: HttpClient) {
    this.urlBackend = `${environment.urlApi}/clinicas-medicas`;
  }

  findById(id: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(`${this.urlBackend}/${id}`);
  }

}
