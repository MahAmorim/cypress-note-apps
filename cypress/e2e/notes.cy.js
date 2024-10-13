Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Cannot read properties of undefined')) {
    return false;
  }
  return true;
});

describe('Operações CRUD de Notas e Validações de Erros', () => {
  beforeEach(() => {
    cy.visit('/notes/app');
    cy.login();
  })

  it('Deve cancelar criação de nota pelo botão', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/notes`).as('createNote');
    cy.get('[data-testid="add-new-note"]').click();
    cy.get('[data-testid="note-title"]').type('Minha Nova Nota');
    cy.get('[data-testid="note-description"]').type('Conteúdo da nota criada via frontend.');
    cy.get('[data-testid="note-cancel"]').click();
  });

  it('Deve criar uma nova nota com sucesso (Frontend e API)', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/notes`).as('createNote');
    cy.get('[data-testid="add-new-note"]').click();
    cy.selectOption('select[name="category"]', 'Work');
    cy.get('[data-testid="note-title"]').type('Minha Nova Nota');
    cy.get('[data-testid="note-description"]').type('Conteúdo da nota criada via frontend.');
    cy.get('[data-testid="note-submit"]').click();
    cy.wait('@createNote').its('response.statusCode').should('eq', 200);
    cy.get('div#root').should('contain', 'Minha Nova Nota');
  });

  it('Deve exibir mensagem de erro ao tentar criar uma nota sem título', () => {
    cy.get('[data-testid="add-new-note"]').click();
    cy.get('[data-testid="note-description"]').type('Tentando criar uma nota sem título.');
    cy.get('[data-testid="note-submit"]').click();
    cy.get('.invalid-feedback').should('be.visible');
  });

  it('Deve exibir mensagem de erro ao tentar criar uma nota sem body', () => {
    cy.get('[data-testid="add-new-note"]').click();
    cy.get('[data-testid="note-title"]').type('Minha Nova Nota');
    cy.get('[data-testid="note-submit"]').click();
    cy.get('.invalid-feedback').should('be.visible');
  });

  it('Deve editar uma nota existente com sucesso', () => {
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/notes/*`).as('editNote');
    cy.get('[data-testid="note-edit"]').first().click();
    cy.get('[data-testid="note-title"]').clear().type('Nota Editada');
    cy.get('[data-testid="note-description"]').clear().type('Conteúdo da nota editada.');
    cy.get('[data-testid="note-submit"]').click();
    cy.wait('@editNote').its('response.statusCode').should('eq', 200);
    cy.get('div#root').should('contain', 'Nota Editada');
  });

  it('Deve editar a categoria de uma nota existente com sucesso', () => {
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/notes/*`).as('editNote');
    cy.get('[data-testid="note-edit"]').first().click();
    cy.selectOption('select[name="category"]', 'Home');
    cy.get('[data-testid="note-submit"]').click();
    cy.wait('@editNote').its('response.statusCode').should('eq', 200);
    cy.get('div#root').should('contain', 'Nota Editada');
  });

  it('Deve checkar uma nota pelo dashboard com sucesso', () => {
    cy.intercept('PATCH', `${Cypress.env('apiUrl')}/notes/*`).as('checkNote');
    cy.get('[data-testid="toggle-note-switch"]').first().click();
    cy.get('[data-testid="toggle-note-switch"]').should('be.checked')
    cy.wait('@checkNote').its('response.statusCode').should('eq', 200);
  });

  it('Deve descheckar uma nota pelo dashboard com sucesso', () => {
    cy.intercept('PATCH', `${Cypress.env('apiUrl')}/notes/*`).as('checkNote');
    cy.get('[data-testid="toggle-note-switch"]:checked').first().click();
    cy.get('[data-testid="toggle-note-switch"]:checked').should('not.exist');
  });

  it('Deve checkar uma nota pelo card com sucesso', () => {
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/notes/*`).as('checkNote');
    cy.get('[data-testid="note-edit"]').first().click();
    cy.get('[data-testid="note-completed"]').click();
    cy.get('[data-testid="note-submit"]').click();
    cy.get('[data-testid="toggle-note-switch"]').should('be.checked')
    cy.wait('@checkNote').its('response.statusCode').should('eq', 200);
  });

  it('Deve filtrar as notas pela categoria Work', () => {
    cy.get('[data-testid="category-home"]').click();
    cy.get('div[data-testid="note-card"]').each(($el) => {
      cy.wrap($el).should('contain', 'Nota Editada');
    });
  });

  it('Deve filtrar as notas pelo título', () => {
    cy.get('[data-testid="search-input"]').type('Nota editada')
    cy.get('[data-testid="search-btn"]').click();
    cy.get('div#root').should('contain', 'Nota Editada');
  });

  it('Deve cancelar a exclusão de uma nota com sucesso', () => {
    cy.intercept('DELETE', `${Cypress.env('apiUrl')}/notes/*`).as('deleteNote');
    cy.get('[data-testid="note-delete"]').first().click();
    cy.get('[data-testid="note-delete-cancel-2"]').click();
  });

  it('Deve excluir de uma nota com sucesso', () => {
    cy.intercept('DELETE', `${Cypress.env('apiUrl')}/notes/*`).as('deleteNote');
    cy.get('[data-testid="note-delete"]').first().click();
    cy.get('[data-testid="note-delete-confirm"]').click();
    cy.wait('@deleteNote').its('response.statusCode').should('eq', 200);
    cy.get('div#root').should('not.contain', 'Nota Editada');
  });

  it('Deve ser possível cadastrar notas sem limite de unidades', () => {
    for (let i = 0; i < 10; i++) {
      cy.intercept('POST', `${Cypress.env('apiUrl')}/notes`).as('createNote');
      cy.get('[data-testid="add-new-note"]').click();
      cy.get('[data-testid="note-title"]').type(`Nota ${i}`);
      cy.get('[data-testid="note-description"]').type('Conteúdo da nota');
      cy.get('[data-testid="note-submit"]').click();
      cy.wait('@createNote').its('response.statusCode').should('eq', 200);
    }
    cy.get('div[data-testid="note-card"]').should('have.length', 10);
  });

  it('Deve lidar com erro da API ao tentar criar uma nota', () => {

    cy.intercept({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/notes`,
    }, {
      statusCode: 500,
      body: {
        message: 'Erro interno no servidor',
      },
    }).as('createNoteError');

    cy.get('[data-testid="add-new-note"]').click();
    cy.get('[data-testid="note-title"]').type('Nota Teste com Erro de API');
    cy.get('[data-testid="note-description"]').type('Tentando criar uma nota com erro de API.');
    cy.get('[data-testid="note-submit"]').click();
    cy.wait('@createNoteError').its('response.statusCode').should('eq', 500);

    cy.get('[data-testid="note-cancel"]').click()
  });
});

after(() => {
  for (let i = 0; i < 10; i++) {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/notes`).as('createNote');
    cy.get('[data-testid="note-delete"]').first().click();
    cy.get('[data-testid="note-delete-confirm"]').click();
    cy.wait(300)
  }
  
  cy.get('[data-testid="logout"]').click()
});;