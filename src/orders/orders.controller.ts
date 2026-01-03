import { Controller, Get, Post, Body, Param, Query, Put, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Pedidos')
@Controller('pedidos')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um pedido e converte USD -> BRL' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista pedidos com paginação' })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.ordersService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um pedido pelo ID' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um pedido' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um pedido' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  
  @Post(':id/comprovante')
  @ApiOperation({ summary: 'Upload de comprovante (Salva em /uploads)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadComprovante(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Arquivo obrigatório!');
    const fileUrl = `http://localhost:3000/uploads/${file.filename}`;
    return this.ordersService.update(id, { receiptUrl: fileUrl } as any);
  }
}