import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token for valid credentials', async () => {
      const loginDto = { login: 'aprovame', password: 'aprovame' };
      const result = { accessToken: 'mockToken' };
      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(loginDto)).toBe(result);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto = { login: 'wrong', password: 'credentials' };

      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new UnauthorizedException('Credenciais inválidas'));

      await expect(authController.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
