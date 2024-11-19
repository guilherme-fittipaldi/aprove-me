import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { ValidatePayableDto } from './dto/validate-payable.dto';

@Injectable()
export class PayablesService {
  constructor(private readonly prisma: PrismaService) {}

  validatePayableData(createPayableDto: ValidatePayableDto) {
    return createPayableDto;
  }

  async create(data: CreatePayableDto) {
    return this.prisma.payable.create({ data });
  }

  async findOne(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
      include: { assignor: true },
    });
  }

  async findAll() {
    return await this.prisma.payable.findMany({ include: { assignor: true } });
  }

  async update(id: string, data: Partial<CreatePayableDto>) {
    return this.prisma.payable.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.payable.delete({ where: { id } });
  }
}
