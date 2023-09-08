CREATE TABLE Premiacoes (
    Id INT auto_increment PRIMARY KEY ,
    IdProcesso INT NOT NULL,
	IdIndicacao INT NOT NULL,
	ValorPremiacao DECIMAL(10,2) NULL,
    createdAt DATETIME,
    updatedAt DATETIME,

	CONSTRAINT fk_Processos_premiacao
	FOREIGN KEY (IdProcesso)
	REFERENCES Processos(id),
	
	CONSTRAINT fk_Indicacoes_premiacao
	FOREIGN KEY (IdIndicacao)
	REFERENCES Indicacoes(id)
);