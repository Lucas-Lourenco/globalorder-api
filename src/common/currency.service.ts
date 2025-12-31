import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  async getUsdExchangeRate(): Promise<number> {
    try {

      const response = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
      return parseFloat(response.data.USDBRL.bid);

    } catch (error) {
      console.error('Erro ao buscar cotação:', error);
      throw new InternalServerErrorException('Falha na conversão de moeda');
    }
  }
}