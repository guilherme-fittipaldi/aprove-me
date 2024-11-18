import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(login: string, password: string): Promise<{ accessToken: string }> {
    if (login !== 'aprovame' || password !== 'aprovame') {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { login };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
