import { IsUUID, IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateAssignorDto {
  // @IsUUID()
  // @IsNotEmpty()
  // id: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  document: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 140)
  name: string;
}
