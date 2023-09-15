export interface PremiacaoResponse
{
    "ValorPremiacao": number,
    "createdAt": Date,
    "updatedAt": Date,
    "IdIndicacao": number,
    "id": number,
    "IdProcesso": number
}

export interface PremiacaoRequest
{
    "ValorPremiacao": number,
    "IdIndicacao": number,
    "IdProcesso": number
}