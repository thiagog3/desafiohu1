# Desafio de auto-complete e busca disponibilidade

***Comando para execução***

>1. *git clone https://github.com/thiagog3/desafiohu1.gitk*
2. *cd desafiohu1*
3. *npm install*
4. *npm start*

***Informações técnicas***
* Back-end desenvovlido em NodeJS utilizando EXPRESS para a API REST e LokiJS para base de dados (NoSQL) de objetos em memória. Os testes da API foram realizados usando o mocha como framework de teste, Should para os asserts e SuperTest para fazer os post/get na api (esses mesmo testes estão rodando no Travis-CI.
* Front-end desenvolvido em AngularJS, bootstrap, usando Pikaday para a seleção de data e TypeAhead (junto com o angular-ui) para o auto-complete das cidades/hoteis. Também conta com o uso do LESS como pre-processador para alguns estilos personalizaods. Os testes unitários estão rodando no Karma utilizando Jasmine e o próprio ngMock, fazendo o mock das GET e verificando se foi chamado. Os testes também são executados no Travis-CI.
* Para a automação de tasks estou usando o GruntJS e o próprio NPM para dependência de pacotes node e bower para o gerenciamento de pacotes de dependência de Javascript front-end.
