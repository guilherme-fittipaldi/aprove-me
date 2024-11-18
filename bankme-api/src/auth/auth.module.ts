import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Adicione esta linha
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'aprovame_secret',
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
