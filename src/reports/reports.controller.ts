import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Relatórios')
@Controller('relatorios')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('top-clientes')
  @ApiOperation({ summary: 'Retorna o ranking dos clientes que mais compraram' })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    description: 'Quantidade de clientes no ranking (Padrão: 5, Máximo: 100)' 
  })
  getTopClients(@Query('limit') limit: number) {
    
    const requestedLimit = limit ? Number(limit) : 5;
 
    const safeLimit = Math.min(requestedLimit, 100);

    return this.reportsService.getTopClients(safeLimit);
  }
}