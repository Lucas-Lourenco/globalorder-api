import { IsArray, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsString() @IsNotEmpty() product: string;
  @IsNumber() quantity: number;
  @IsNumber() priceUnitPriceUSD: number;
}

export class CreateOrderDto {
  @IsMongoId() customerId: string;
  @IsDateString() date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}