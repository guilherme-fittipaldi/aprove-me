import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(login, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(login: string, password: string) {
    const user = await this.validateUser(login, password);

    const payload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
