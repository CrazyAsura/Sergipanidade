import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreatePhoneDto {
  @ApiProperty({ example: '+55' })
  @IsString()
  @IsOptional()
  ddi?: string;

  @ApiProperty({ example: '79' })
  @IsString()
  @IsNotEmpty()
  ddd: string;

  @ApiProperty({ example: '999999999' })
  @IsString()
  @IsNotEmpty()
  number: string;
}

class CreateAddressDto {
  @ApiProperty({ example: '49000-000' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: 'Rua Exemplo' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '123' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ example: 'Apto 101', required: false })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ example: 'Aracaju' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'SE' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'Brasil' })
  @IsString()
  @IsOptional()
  country?: string;
}

export class RegisterDto {
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

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
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
