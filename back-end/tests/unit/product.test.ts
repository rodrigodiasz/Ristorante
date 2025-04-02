import { CreateProductService } from "../../src/services/product/CreateProductService";
import prismaClient from "../../src/prisma";

describe("CreateProductService", () => {
  const createProductService = new CreateProductService();

  test("Deve cadastrar um produto corretamente", async () => {
    // Primeiro, cria uma categoria
    const category = await prismaClient.category.create({
      data: {
        name: "Categoria Teste Jest",
      },
    });

    // Agora cria o produto
    const product = await createProductService.execute({
      name: "Produto Teste Jest",
      price: "29.90",
      description: "Descrição do produto de teste",
      banner: "imagem.jpg",
      category_id: category.id,
    });

    expect(product).toHaveProperty("id");
    expect(product.name).toBe("Produto Teste Jest");

    // Boa prática: Limpar categoria criada no teste
    await prismaClient.product.delete({
      where: { id: product.id },
    });
    await prismaClient.category.delete({
      where: { id: category.id },
    });
  });
});
