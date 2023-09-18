# Projeto Integrador - Grupo 02

O presente Projeto Integrador Senac é composto de dois subprojetos: o indica-api e o indica-estatico.
Contém, também, uma pasta contendo os comandos SQL para criação das tabelas MySql utilizadas na aplicação.
Participaram da sua elaboração os alunos:
* HEITOR ALEXANDRINO DOS SANTOS ARRUDA
* ABNER ANTONIO JANUARIO MARCELINO
* MACIEL BATISTA DE FREITAS
* JOSE ROBERTO TRINDADE LIMA

## Banco de Dados
Foi utilizado o SGBD MySql para armazenamento dos dados da aplicação. Os scripts para criação das tabelas está disponível na pasta 'test-files'.

## indica-api
O indica-api foi elaborado usando node.js, aliado ao express (para controle de roteamento), body-parser (para converter as respostas do banco de dados em objetos json) e sequelize (para integração com o banco de dados MySql). Para utilização, deve-se navegar para a pasta indica-api e executar os seguintes comandos:
```
npm install
npm start
```
Uma vez iniciada, a api estará disponível na porta localhost:3000.

## indica-estatico
O indica-estatico foi elaborado usando node.js, com interface provida pelo framework Angular (controller), bootstrap (formatação css) e font-awesome (ícones). Para utilização, deve-se navegar para a pasta indica-api e executar os seguintes comandos:
```
npm install
npm start
```
Uma vez iniciada, a aplicação estática estará disponível na porta localhost:4200.
