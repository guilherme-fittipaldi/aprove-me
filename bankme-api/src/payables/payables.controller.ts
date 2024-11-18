import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PayablesService } from './payables.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { ValidatePayableDto } from './dto/validate-payable.dto';

@Controller('integrations/payable')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  async validate(@Body() createPayableDto: ValidatePayableDto) {
    return {
      message: 'Dados validados com sucesso.',
      data: createPayableDto,
    };
  }

  @Post('/create')
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payablesService.create(createPayableDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payablesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreatePayableDto>,
  ) {
    return this.payablesService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.payablesService.delete(id);
  }
}