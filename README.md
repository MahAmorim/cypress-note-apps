# Desafio Técnico: Automação de Testes com Cypress

## Objetivo
Avaliar suas habilidades em automação de testes frontend e backend utilizando Cypress. O desafio consiste em criar um projeto Cypress e implementar testes com base na história de usuário fornecida. Você deverá rodar os testes em sua máquina local e entregar um relatório detalhado da execução.

## História de Usuário para Automação de Testes

**Contexto:**  
Você faz parte de uma equipe responsável por desenvolver e garantir a qualidade de uma aplicação de gerenciamento de notas. Os usuários podem criar, editar, visualizar e excluir suas anotações. A aplicação possui uma interface web e uma API backend que gerencia os dados.

**História:**  
Como um usuário autenticado, quero acessar minha conta, criar novas notas, atualizar e excluir anotações existentes, para organizar minhas ideias de forma eficiente.

### Critérios de Aceitação

1. O usuário deve se autenticar com credenciais válidas.
2. O usuário pode visualizar uma lista de suas notas.
3. O usuário pode criar uma nova nota com título e conteúdo.
4. O usuário pode editar uma nota existente.
5. O usuário pode excluir uma nota.
6. Somente o dono da conta pode visualizar e manipular suas próprias notas.
7. O sistema deve fornecer feedback apropriado em casos de erros (ex.: falha de autenticação ou nota sem título).

## Requisitos do Desafio

### 1. Criação de Projeto Cypress
- Crie um projeto de automação de testes utilizando Cypress para testar o frontend da aplicação disponível em: [https://practice.expandtesting.com/notes/app](https://practice.expandtesting.com/notes/app).
- As APIs a serem testadas estão disponíveis em: [https://practice.expandtesting.com/notes/api](https://practice.expandtesting.com/notes/api).

### 2. Testes Frontend
- Implemente testes automatizados para validar os fluxos descritos na história de usuário, garantindo que a interface funcione conforme os critérios de aceitação mencionados.

### 3. Testes de API
- Automate as chamadas de API utilizando Cypress para validar as funcionalidades de criação, edição, visualização e exclusão de notas.

### 4. Execução Local
- Os testes devem ser executados localmente em sua máquina. Não é necessária a integração com pipelines de CI/CD.

### 5. Relatório de Execução
- Apresente um relatório gerado pela execução dos testes, demonstrando a cobertura e os resultados de cada cenário testado.

## Instruções de Entrega
- Entregue o código fonte do projeto Cypress junto com o relatório de execução até **14/10**.
- Utilize todos os recursos disponíveis, incluindo IA, para concluir o desafio.

## Entrega Esperada

- **Projeto Cypress completo**, contendo os testes automatizados do frontend e das APIs.
- **Relatório detalhado da execução dos testes** (gerado pelo Cypress), mostrando a cobertura de testes e o status de cada cenário.


