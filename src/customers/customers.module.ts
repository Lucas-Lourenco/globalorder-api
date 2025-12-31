import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])
  ],
  exports: [MongooseModule], // Exporta para que Pedidos possa usar depois
})
export class CustomersModule {}