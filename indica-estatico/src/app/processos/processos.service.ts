import { Injectable } from '@angular/core';
import { Processo, ProcessoRequest, ProcessoResponse } from '../entities/processos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  processos: Array<Processo> = [];

  constructor(private http:HttpClient) { }

  incluirProcesso(req: ProcessoRequest) :Observable<ProcessoResponse>{
    return this.http.post<ProcessoResponse>(`${API}/processos/`, req,);
  }

  listarProcessos() :Observable<ProcessoResponse[]>{
    return this.http.get<ProcessoResponse[]>(`${API}/processos/`);
  };

  atualizarStatusProcesso(id: number, NovoStatus: string) {
    const req = { Status: NovoStatus} 
    return this.http.put<ProcessoResponse>(`${API}/processos/${id}`, req);
  }

}
