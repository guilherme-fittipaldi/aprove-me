import {
  IsUUID,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateAssignorDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @MaxLength(30)
  @IsNotEmpty()
  document: string;

  @MaxLength(140)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(20)
  @IsString()
  phone: string;

  @MaxLength(140)
  @IsString()
  name: string;
}
