describe('Cadastro de Pedido', () => {
  it('Fluxo completo de cadastro e finalização', () => {
    cy.visit('/');
    // Faz login
    cy.get('input[name="email"]').type('jest@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Garante que está na dashboard
    cy.url().should("include", "/dashboard");
    

    // Agora acessa a página de cadastro de mesa
    cy.visit('/dashboard/table');

    cy.contains('Cadastrar Mesa').should('be.visible');
    
    // Continua o fluxo
    cy.get('input[placeholder="Ex: 1"]').type('390');
    cy.get('input[placeholder="Ex: João Silva"]').type('Cliente Cypress');
    cy.contains('Abrir Mesa').click();

    cy.contains('Mesa aberta com sucesso').should('be.visible');
  });
});
