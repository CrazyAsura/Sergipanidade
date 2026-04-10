import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreatePhoneDto {
  @IsString()
  @IsOptional()
  ddi?: string;

  @IsString()
  @IsNotEmpty()
  ddd: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}

class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsOptional()
  country?: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '000.000.000-00', required: false })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty({ example: 'joao@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hashedPassword' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: [CreatePhoneDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDto)
  @IsOptional()
  phones?: CreatePhoneDto[];

  @ApiProperty({ type: [CreateAddressDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsOptional()
  addresses?: CreateAddressDto[];
}
