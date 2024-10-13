describe('Validação de Autenticação e Teste de Credenciais de Usuário', () => {
  beforeEach(() => {
    cy.visit('/notes/app');
  })

  it('Deve autenticar o usuário com credenciais válidas', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/users/login`).as('loginRequest');
    cy.visit('/notes/app');
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  })

  it('Deve exibir mensagem de erro ao inserir credenciais inválidas', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/users/login`).as('loginRequest');
    cy.get('input[name="email"]').type('invaliduser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
  });

  it('Deve exibir mensagem de erro ao tentar logar sem email', () => {
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should('be.visible').should('contain', 'Email address is required');
  });

  it('Deve exibir mensagem de erro ao não inserir senha', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/users/login`).as('loginRequest');
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
  });

  it('Deve exibir mensagem de erro ao inserir um email não registrado', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/users/login`).as('loginRequest');
    cy.get('input[name="email"]').type('notregistered@example.com');
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
  });

  it('Deve exibir mensagem de erro ao inserir um email sem o símbolo "@"', () => {
    cy.get('input[name="email"]').type('invalidemail.com');
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should('contain', 'Email address is invalid');
  });

  it('Deve exibir mensagem de erro ao inserir um email sem domínio', () => {
    cy.get('input[name="email"]').type('invalidemail@domain');
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('button[type="submit"]').click();
    cy.get('.invalid-feedback').should('contain', 'Email address is invalid');
  });
})