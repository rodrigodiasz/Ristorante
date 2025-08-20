import { CreateUserService } from "../../src/services/user/CreateUserService";

describe('CreateUserService', () => {
  const createUserService = new CreateUserService();

  test('Deve criar usuário corretamente', async () => {
    const user = await createUserService.execute({
      name: "Teste Jest 22",
      email: "jest04@teste.com",
      password: "123456"
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('jest04@teste.com');
  });
});


