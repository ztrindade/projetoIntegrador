export interface Indicacao {
    aceita: boolean,
    id: number,
    indicante: string,
    linkedin: string
    nomeIndicado: string,
    telefoneIndicado: string
}

export interface IndicacaoRequest {
    IdProcesso: number,
    NomeIndicado: string,
    TelefoneIndicado: string,
    MatriculaIndicante: string,
    Status: string,
    Linkedin: string     
}

export interface IndicacaoResponse {
    id: number,
    NomeIndicado: string,
    TelefoneIndicado: string,
    MatriculaIndicante: string,
    Status: string,
    Linkedin: string,     
    createdAt: Date,
    updatedAt: Date
    IdProcesso: number,
}