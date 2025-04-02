describe("Cadastro de Produto", () => {
  it("Deve realizar o cadastro de um novo produto", () => {
    // Acessa a página de login
    cy.visit("http://localhost:3000/");

    // Faz login
    cy.get('input[name="email"]').type('jest@teste.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Redireciona para Dashboard
    cy.url().should("include", "/dashboard");

    // Acessa página de cadastro de produto
    cy.visit("http://localhost:3000/dashboard/product");

    // Seleciona uma categoria
    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').first().click();

    // Preenche os campos
    cy.get('input[name="name"]').type(`Produto Teste ${Date.now()}`);
    cy.get('input[name="price"]').type("29.90");
    cy.get('textarea[name="description"]').type("Descrição do produto teste");

    // Faz upload de uma imagem de teste
    const imagePath = "cypress/fixtures/produto-teste.png";
    cy.get('input[type="file"]').selectFile(imagePath, { force: true });

    // Clica em cadastrar
    cy.get('button').contains("Cadastrar Produto").click();

    // Verifica se foi redirecionado para Dashboard
    cy.url().should("include", "/dashboard");
    cy.contains("Pedidos");
  });
});
