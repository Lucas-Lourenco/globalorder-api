import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Lucas Lourenço' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'exemple@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Brasil' })
  @IsString()
  @IsNotEmpty()
  pais: string;
}