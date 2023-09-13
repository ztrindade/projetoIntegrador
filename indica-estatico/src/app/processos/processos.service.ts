import { Injectable } from '@angular/core';
import { Processo, ProcessoRequest, ProcessoResponse } from '../entities/processos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IndicacaoRequest, IndicacaoResponse } from '../entities/indicacoes';
import { PremiacaoResponse } from '../entities/premiacoes';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  processos: Array<Processo> = [];

  constructor(private http:HttpClient) { }

  incluirIndicacao(req: IndicacaoRequest) :Observable<IndicacaoResponse>{
    return this.http.post<IndicacaoResponse>(`${API}/indicacoes/`, req,);
  }

  incluirProcesso(req: ProcessoRequest) :Observable<ProcessoResponse>{
    return this.http.post<ProcessoResponse>(`${API}/processos/`, req,);
  }

  listarIndicacoes(idProcesso: number) :Observable<IndicacaoResponse[]>{
    return this.http.get<IndicacaoResponse[]>(`${API}/indicacoes/${idProcesso}`);
  };

  listarPremiacoes(idProcesso: number) :Observable<PremiacaoResponse[]>{
    return this.http.get<PremiacaoResponse[]>(`${API}/premiacoes/${idProcesso}`);
  };

  listarProcessos() :Observable<ProcessoResponse[]>{
    return this.http.get<ProcessoResponse[]>(`${API}/processos/`);
  };

  atualizarStatusProcesso(id: number, NovoStatus: string) {
    const req = { Status: NovoStatus} 
    return this.http.put<ProcessoResponse>(`${API}/processos/${id}`, req);
  }

}
