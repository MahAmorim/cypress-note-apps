Cypress.Commands.add("login", (
    email = Cypress.env("email"),
    password = Cypress.env("password"),
) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click({ force: true });
});

Cypress.Commands.add('selectOption', (selectLocator, optionText) => {
    cy.get(selectLocator).select(optionText);
});

