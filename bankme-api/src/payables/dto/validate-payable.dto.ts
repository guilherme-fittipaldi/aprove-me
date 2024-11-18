import { Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { CreateAssignorDto } from 'src/assignors/dto/create-assignor.dto';

export class ValidatePayableDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  emissionDate: Date;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAssignorDto) 
  assignor: CreateAssignorDto;
}
