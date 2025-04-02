import { AddItemService } from "../../src/services/order/AddItemService";

describe("AddItemService", () => {
  const addItemService = new AddItemService();

  test("Deve adicionar um item ao pedido", async () => {
    const item = await addItemService.execute({
      order_id: "08839d8a-239e-4ef3-a23a-5918139a45fa", // coloque um ID válido
      product_id: "5a90637b-a65c-4cf3-8818-5464a9e86c5a", // coloque um ID válido
      amount: 2
    });

    expect(item).toHaveProperty("id");
    expect(item.amount).toBe(2);
    expect(item.order_id).toBe("08839d8a-239e-4ef3-a23a-5918139a45fa");
    expect(item.product_id).toBe("5a90637b-a65c-4cf3-8818-5464a9e86c5a");
  });
});
