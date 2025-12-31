import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../orders/schemas/order.schema';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getTopClients(limit: number = 5) {
    
    const orders = await this.orderModel.find().populate('customerId').exec();

  
    const mapClientes = {};

    orders.forEach((order) => {
      if (!order.customerId || !order.totalAmountBRL) return;

      const cliente: any = order.customerId;
      const idCliente = cliente._id.toString();

      if (!mapClientes[idCliente]) {
        mapClientes[idCliente] = {
          cliente: cliente.name,
          email: cliente.email,
          totalGastoEmReal: 0,
        };
      }

      mapClientes[idCliente].totalGastoEmReal += order.totalAmountBRL;
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