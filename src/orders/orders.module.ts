import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull'; 
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { Customer, CustomerSchema } from '../customers/schemas/customer.schema';
import { OrdersProcessor } from './orders.processor'; 
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Customer.name, schema: CustomerSchema }, 
    ]),
    
    BullModule.registerQueue({
      name: 'notificacao',
    }),
    CommonModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersProcessor], 
})
export class OrdersModule {}