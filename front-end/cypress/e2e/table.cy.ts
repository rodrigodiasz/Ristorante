describe('Cadastro de Pedido', () => {
  it('Fluxo completo de cadastro e finalização', () => {
    cy.visit('/');

    cy.get('input[name="email"]').type('jest@teste.com');
    cy.get('input[name="password"]').type('123456');

    cy.contains('Login').click();
    cy.url().should('include', '/dashboard');
    

    // Agora acessa a página de cadastro de mesa
    cy.visit('/dashboard/table');

    cy.contains('Cadastrar Mesa').should('be.visible');
    
    // Continua o fluxo
    cy.get('input[placeholder="Número"]').type('250');
    cy.get('input[placeholder="Nome"]').type('Cliente Cypress');
    cy.contains('Abrir Mesa').click();

    cy.contains('Mesa aberta com sucesso').should('be.visible');
  });
});
