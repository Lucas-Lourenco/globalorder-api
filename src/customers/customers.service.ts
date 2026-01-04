import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {

    const createdCustomer = new this.customerModel(createCustomerDto);
    try {
      return await createdCustomer.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Este e-mail já está cadastrado.');
      }
      throw new InternalServerErrorException('Erro ao criar cliente.');
    }
  }

  async findAll(): Promise<Customer[]> {

    return this.customerModel.find().exec();

  }

  async findOne(id: string): Promise<Customer> {

    const customer = await this.customerModel.findById(id).exec();

    if (!customer) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);

    }

    return customer;

  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();

    if (!updatedCustomer) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return updatedCustomer;
  }

  async remove(id: string): Promise<void> {

    const result = await this.customerModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
  }
}