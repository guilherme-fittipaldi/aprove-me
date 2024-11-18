import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';

@Module({
  controllers: [AssignorsController],
  providers: [AssignorsService, PrismaService],
})
export class AssignorsModule {}
