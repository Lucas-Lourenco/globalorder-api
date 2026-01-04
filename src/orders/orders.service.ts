import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull'; 
import type { Queue } from 'bull'; 
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrencyService } from '../common/currency.service'; 
import { Customer } from '../customers/schemas/customer.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
   
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    private currencyService: CurrencyService,
    @InjectQueue('notificacao') private notificacaoQueue: Queue, 
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    
  
    const customer = await this.customerModel.findById(createOrderDto.customerId);
    
    if (!customer) {
      throw new NotFoundException('Cliente não encontrado. Verifique o ID.');
    }

    const totalUSD = createOrderDto.items.reduce((acc, item) => {
      return acc + (item.quantity * item.priceUnitPriceUSD);
    }, 0);

    const rate = await this.currencyService.getUsdExchangeRate();
    const totalBRL = totalUSD * rate;

    const newOrder = new this.orderModel({
      ...createOrderDto,
      totalAmountUSD: totalUSD,
      totalAmountBRL: totalBRL,
    });

    const savedOrder = await newOrder.save();

    const emailPayload = {
      nome: customer.name,
      email: customer.email,
      pedidoId: savedOrder._id,
      valorTotal: savedOrder.totalAmountBRL,
      itens: savedOrder.items 
    };

   
    await this.notificacaoQueue.add('enviar-email', emailPayload);

    return savedOrder;
  }
  async findAll(page: number, limit: number) {
    const pageNumber = page > 0 ? page : 1;
    const limitNumber = limit > 0 ? limit : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const result = await this.orderModel.find()
      .populate('customerId') 
      .skip(skip)
      .limit(limitNumber)
      .exec();

    return result;
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('customerId').exec();
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  async update(id: string, updateOrderDto: any): Promise<Order> {
   if (updateOrderDto.items && updateOrderDto.items.length > 0) {
      const totalUSD = updateOrderDto.items.reduce((acc, item) => {
        return acc + (item.quantity * item.priceUnitPriceUSD);
      }, 0);

      const rate = await this.currencyService.getUsdExchangeRate();
      const totalBRL = totalUSD * rate;

      updateOrderDto['totalAmountUSD'] = totalUSD;
      updateOrderDto['totalAmountBRL'] = totalBRL;
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException('Pedido não encontrado para atualização');
    }
    return updatedOrder;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Pedido não encontrado para remoção');
    }
  }
}