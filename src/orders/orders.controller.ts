import { Controller, Get, Post, Body, Param, Query, Delete, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UpdateOrderDto } from './dto/update-order.dto'; 

@ApiTags('Pedidos') 
@Controller('pedidos')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um pedido e calcula conversão USD -> BRL' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista pedidos com paginação' })
  findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10 
  ) {
    return this.ordersService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza dados de um pedido' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um pedido do banco de dados' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}