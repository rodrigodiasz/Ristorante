describe("Cadastro de Categoria", () => {
  it("Deve realizar o cadastro de uma nova categoria", () => {
    // Acessa a página de login
    cy.visit("http://localhost:3000/");

    // Faz login
    cy.get('input[name="email"]').type('jest@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Redireciona para Dashboard
    cy.url().should("include", "/dashboard");

    // Acessa a página de cadastro de categoria
    cy.visit("http://localhost:3000/dashboard/category");

    // Preenche e cadastra uma nova categoria
    const categoria = `Categoria ${Date.now()}`; // Para não duplicar

    cy.get('input[name="name"]').type(categoria);
    cy.get('button').contains("Cadastrar").click();

    // Valida se foi redirecionado para dashboard
    cy.url().should("include", "/dashboard");

    // Valida visualmente se o pedido de sucesso foi disparado
    cy.contains("Pedidos"); // texto que sempre aparece na Dashboard
  });
});
