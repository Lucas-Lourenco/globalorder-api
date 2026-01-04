import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/schemas/order.schema';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getTopClients(limit: number = 5) {
    
    const orders = await this.orderModel.find().populate('clienteId').exec();

  
    const mapClientes = {};

    orders.forEach((order) => {
      if (!order.clienteId || !order.valorTotalBRL) return;

      const cliente: any = order.clienteId;
      const idCliente = cliente._id.toString();

      if (!mapClientes[idCliente]) {
        mapClientes[idCliente] = {
          cliente: cliente.nome,
          email: cliente.email,
          totalGastoEmReal: 0,
        };
      }

      mapClientes[idCliente].totalGastoEmReal += order.valorTotalBRL;
    });

    const ranking = Object.values(mapClientes)
      .map((client: any) => ({
        ...client,
      
        totalGastoEmReal: Number(client.totalGastoEmReal.toFixed(2)), 
      }))
      .sort((a: any, b: any) => b.totalGastoEmReal - a.totalGastoEmReal)
      .slice(0, limit);

    return ranking;
  }
}