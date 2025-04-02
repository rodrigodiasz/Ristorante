import prismaClient from "../../src/prisma";
import { FinishOrderService } from "../../src/services/order/FinishOrderService";

describe("FinishOrderService", () => {
  const finishOrderService = new FinishOrderService();

  test("Deve finalizar um pedido corretamente", async () => {
    // 1 - Criar uma categoria
    const category = await prismaClient.category.create({
      data: {
        name: "Categoria Teste",
      },
    });

    // 2 - Criar um produto
    const product = await prismaClient.product.create({
      data: {
        name: "Produto Teste",
        price: "10.00",
        description: "Produto de teste",
        banner: "imagem.jpg",
        category_id: category.id,
      },
    });

    // 3 - Criar um pedido
    const order = await prismaClient.order.create({
      data: {
        table: 1,
        status: false,
        draft: false,
        name: "Mesa Teste",
      },
    });

    // 4 - Adicionar item ao pedido
    await prismaClient.item.create({
      data: {
        order_id: order.id,
        product_id: product.id,
        amount: 1,
      },
    });

    // 5 - Finalizar o pedido
    const result = await finishOrderService.execute({
      order_id: order.id,
    });

    expect(result).toHaveProperty("status", true);

    // 6 - Limpar registros criados no banco
    await prismaClient.item.deleteMany({ where: { order_id: order.id } });
    await prismaClient.order.delete({ where: { id: order.id } });
    await prismaClient.product.delete({ where: { id: product.id } });
    await prismaClient.category.delete({ where: { id: category.id } });
  });
});
