import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AssignorsController],
  providers: [AssignorsService, PrismaService],
})
export class AssignorsModule {}
