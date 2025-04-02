import { CreateCategoryService } from "../../src/services/category/CreateCategoryService";

describe("CreateCategoryService", () => {
  const createCategoryService = new CreateCategoryService();

  test("Deve criar uma categoria corretamente", async () => {
    const category = await createCategoryService.execute({
      name: "Categoria Teste"
    });

    expect(category).toHaveProperty("id");
    expect(category.name).toBe("Categoria Teste");
  });
});
