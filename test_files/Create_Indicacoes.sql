CREATE TABLE Indicacoes (
    Id INT auto_increment PRIMARY KEY ,
    IdProcesso INT NOT NULL,
    NomeIndicado VARCHAR(200) NOT NULL,
    TelefoneIndicado VARCHAR(14) NOT NULL,
    MatriculaIndicante VARCHAR(50) NOT NULL,
    Status VARCHAR(20),
    Linkedin VARCHAR(200),
    createdAt DATETIME,
    updatedAt DATETIME,
	
	CONSTRAINT fk_Processos
        FOREIGN KEY (IdProcesso)
        REFERENCES Processos(id)
);

