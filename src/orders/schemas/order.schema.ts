import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class OrderItem {
  @Prop({ required: true })
  produto: string;

  @Prop({ required: true })
  quantidade: number;

  @Prop({ required: true })
  precoUnitarioUSD: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  clienteId: Types.ObjectId;

  @Prop({ required: true })
  data: Date;

  @Prop({ type: [OrderItem], required: true })
  itens: OrderItem[];

  @Prop({ required: true })
  valorTotalUSD: number;

  @Prop({ required: true })
  valorTotalBRL: number;

  @Prop({ default: null })
  comprovanteURL: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);