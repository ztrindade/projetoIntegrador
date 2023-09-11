CREATE TABLE Processos (
    Id INT auto_increment PRIMARY KEY,
    Empresa VARCHAR(200) NOT NULL,
    Vaga VARCHAR(200) NOT NULL,
    MatriculaRH VARCHAR(50) NOT NULL,
    Status VARCHAR(20),
    ValorPremiacao DECIMAL(10,2) NULL,
    createdAt DATETIME,
    updatedAt DATETIME
);