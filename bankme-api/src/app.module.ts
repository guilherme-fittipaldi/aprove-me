import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PayablesModule } from './payables/payables.module';
import { AssignorsModule } from './assignors/assignors.module';

@Module({
  imports: [PayablesModule, AssignorsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
