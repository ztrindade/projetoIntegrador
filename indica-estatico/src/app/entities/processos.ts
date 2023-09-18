import { Indicacao } from "./indicacoes"

export interface Processo {
    id: number,
    indice: number
    empresa: string,
    vaga: string,
    aberto: boolean
    valor: number,
    tsCriacao: Date,
    tsAtualizacao: Date,
    indicacoes: Indicacao[]
}

export interface ProcessoRequest {
    Empresa: string,
    Vaga: string,
    MatriculaRH: string,
    Status: string,
    ValorPremiacao: number,
}

export interface ProcessoResponse {
    id: number,
    Empresa: string,
    Vaga: string,
    MatriculaRH: string,
    Status: string,
    ValorPremiacao: number,
    createdAt: Date,
    updatedAt: Date
}

export { Indicacao }

