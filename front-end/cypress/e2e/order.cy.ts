describe("Cadastro de Pedido", () => {
  it("Deve realizar o cadastro e finalização de um pedido", () => {
    // Acessa a página de login
    cy.visit("http://localhost:3000/");

    // Faz login
    cy.get('input[name="email"]').type('jest@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Garante que está na dashboard
    cy.url().should("include", "/dashboard");

    // Clica para cadastrar mesa (ou navega direto, se tiver rota)
    cy.visit("http://localhost:3000/dashboard/table");

    // Preenche dados da mesa
    cy.get('input[placeholder="Número"]').type("99");
    cy.get('input[placeholder="Nome"]').type("Mesa Teste");
    cy.get("button").contains("Abrir Mesa").click();

    // Redireciona para dashboard
    cy.url().should("include", "/dashboard");

    // Acessa página de pedido
    cy.visit("http://localhost:3000/dashboard/order");

    // Seleciona mesa
    cy.get('[role="combobox"]').first().click();
    cy.get('[role="option"]').first().click();

    // Seleciona categoria
    cy.get('[role="combobox"]').eq(1).click();
    cy.get('[role="option"]').first().click();

    // Seleciona produto
    cy.get('[role="combobox"]').eq(2).click();
    cy.get('[role="option"]').first().click();

    // Adiciona quantidade e item
    cy.get('input[type="number"]').clear().type("2");
    cy.get("button").contains("Adicionar").click();

    // Finaliza pedido
    cy.get("button").contains("Finalizar Pedido").click();

    // Valida retorno para dashboard
    cy.url().should("include", "/dashboard");
    cy.contains("Pedidos");
  });
});
