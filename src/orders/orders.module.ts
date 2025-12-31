import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller'; 
import { Order, OrderSchema } from './schemas/order.schema';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CommonModule,
  ],
  controllers: [OrdersController], 
  providers: [OrdersService],
})
export class OrdersModule {}