import { CreateOrderService } from "../../src/services/order/CreateOrderService";

describe("CreateOrderService", () => {
  const createOrderService = new CreateOrderService();

  test("Deve cadastrar uma mesa corretamente", async () => {
    const order = await createOrderService.execute({
      table: 170,
      name: "Mesa Teste"
    });

    expect(order).toHaveProperty("id");
    expect(order.table).toBe(170);
    expect(order.name).toBe("Mesa Teste");
    expect(order.draft).toBe(false); 
  });
});
