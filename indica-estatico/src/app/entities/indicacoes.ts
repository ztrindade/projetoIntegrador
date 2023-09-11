export interface Indicacao {
    aceita: boolean,
    indicante: string,
    linkedin: string
    nomeIndicado: string,
    telefoneIndicado: string,
    sequencial: number
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
    Id: number,
    IdProcesso: number,
    NomeIndicado: string,
    TelefoneIndicado: string,
    MatriculaIndicante: string,
    Status: string,
    Linkedin: string,     
    createdAt: Date,
    updatedAt: Date
}