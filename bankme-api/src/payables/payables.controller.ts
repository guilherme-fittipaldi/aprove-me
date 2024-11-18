import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { ValidatePayableDto } from './dto/validate-payable.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('integrations/payable')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async validate(@Body() createPayableDto: ValidatePayableDto) {
    return {
      message: 'Dados validados com sucesso.',
      data: createPayableDto,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payablesService.create(createPayableDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreatePayableDto>,
  ) {
    return this.payablesService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.payablesService.delete(id);
  }
}
