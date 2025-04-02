import { AuthUserService } from "../../src/services/user/AuthUserService";

describe("AuthUserService", () => {
  const authUserService = new AuthUserService();

  test("Deve realizar login corretamente", async () => {
    // Pré-condição: Você deve ter um usuário criado no banco para este teste funcionar
    const user = await authUserService.execute({
      email: "jest@teste.com",
      password: "123456"
    });

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("token");
    expect(user.email).toBe("jest@teste.com");
  });

  test("Deve falhar ao tentar logar com senha incorreta", async () => {
    await expect(
      authUserService.execute({
        email: "jest@teste.com",
        password: "senhaerrada"
      })
    ).rejects.toThrow("password incorrect");
  });

  test("Deve falhar ao tentar logar com usuário inexistente", async () => {
    await expect(
      authUserService.execute({
        email: "naoexiste@teste.com",
        password: "123456"
      })
    ).rejects.toThrow("user incorrect");
  });
});
