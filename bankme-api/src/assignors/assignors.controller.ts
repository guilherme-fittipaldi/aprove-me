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
import { AssignorsService } from './assignors.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('integrations/assignor')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorsService.create(createAssignorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.assignorsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.assignorsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateAssignorDto>,
  ) {
    return this.assignorsService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.assignorsService.delete(id);
  }
}
