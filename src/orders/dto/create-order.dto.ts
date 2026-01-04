import { IsArray, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderItemDto {
  @ApiProperty({ example: 'Mouse Gamer RGB', description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  produto: string;

  @ApiProperty({ example: 2, description: 'Quantidade comprada' })
  @IsNumber()
  quantidade: number;

  @ApiProperty({ example: 50.00, description: 'Preço unitário em Dólares' })
  @IsNumber()
  precoUnitarioUSD: number;
}

export class CreateOrderDto {
  
  @ApiProperty({ 
    example: '659d5a1b8f6a9c1234567890', 
    description: 'ID do Cliente (Copie do GET /clientes)' 
  })
  @IsMongoId()
  clienteId: string;

  @ApiProperty({ example: '2025-12-31', description: 'Data do pedido (AAAA-MM-DD)' })
  @IsDateString()
  data: string;

  @ApiProperty({ 
    type: [CreateOrderItemDto], 
    description: 'Lista de produtos',
    example: [
      {
        produto: "Mouse Gamer",
        quantidade: 2,
        precoUnitarioUSD: 50
      },
      {
        produto: "Teclado Mecânico",
        quantidade: 1,
        precoUnitarioUSD: 100
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  itens: CreateOrderItemDto[];
}