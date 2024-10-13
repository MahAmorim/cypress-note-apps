describe('Validação de Permissões de Acesso e Manipulação de Notas entre Usuários', () => {
    beforeEach(() => {
        cy.visit('/notes/app');
    })

    it('Deve impedir o acesso a notas de outros usuários', () => {
        cy.login('userA@example.com', 'password123');
        cy.intercept('POST', `${Cypress.env('apiUrl')}/notes`).as('createNote');
        cy.get('[data-testid="add-new-note"]').click();
        cy.get('[data-testid="note-title"]').type('Nota do Usuário A');
        cy.get('[data-testid="note-description"]').type('Conteúdo da nota do Usuário A');
        cy.get('[data-testid="note-submit"]').click();
        cy.wait('@createNote').its('response.statusCode').should('eq', 200);
        cy.get('[data-testid="logout"]').click();

        cy.get('.btn-primary').contains('Login').click()
        cy.login();
        cy.visit('/notes/app/nota-de-usuarioA-id');
        cy.contains('Sorry ... The requested page is not available')
        cy.contains('Back to homepage').click()
        cy.get('div#root').should('not.contain', 'Nota do Usuário A');
    });
});