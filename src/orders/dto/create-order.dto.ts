import { IsArray, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderItemDto {
  @ApiProperty({ example: 'Mouse Gamer RGB', description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({ example: 2, description: 'Quantidade comprada' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 50.00, description: 'Preço unitário em Dólares' })
  @IsNumber()
  priceUnitPriceUSD: number;
}

export class CreateOrderDto {
  
  @ApiProperty({ 
    example: '659d5a1b8f6a9c1234567890', 
    description: 'ID do Cliente (Copie do GET /clientes)' 
  })
  @IsMongoId()
  customerId: string;

  @ApiProperty({ example: '2025-12-31', description: 'Data do pedido (AAAA-MM-DD)' })
  @IsDateString()
  date: string;

  @ApiProperty({ 
    type: [CreateOrderItemDto], 
    description: 'Lista de produtos',
    example: [
      {
        product: "Mouse Gamer",
        quantity: 2,
        priceUnitPriceUSD: 50
      },
      {
        product: "Teclado Mecânico",
        quantity: 1,
        priceUnitPriceUSD: 100
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}