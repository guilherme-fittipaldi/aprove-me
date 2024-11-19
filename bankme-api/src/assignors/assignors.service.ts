import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';

@Injectable()
export class AssignorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAssignorDto) {
    return this.prisma.assignor.create({ data });
  }

  async findOne(id: string) {
    return this.prisma.assignor.findUnique({
      where: { id },
      include: { payables: true },
    });
  }

  async findAll() {
    return await this.prisma.assignor.findMany();
  }

  async update(id: string, data: Partial<CreateAssignorDto>) {
    return this.prisma.assignor.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.assignor.delete({ where: { id } });
  }
}
