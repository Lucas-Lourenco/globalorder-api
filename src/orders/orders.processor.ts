import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('notificacao')
export class OrdersProcessor {
  private readonly logger = new Logger(OrdersProcessor.name);

  @Process('enviar-email')
  async handleEnviarEmail(job: Job) {
    const pedido = job.data;
    
    this.logger.debug('------------------------------------------------');
    this.logger.debug(`📧 SIMULANDO ENVIO DE E-MAIL...`);
    this.logger.debug(`Para Cliente ID: ${pedido.customerId}`);
    this.logger.debug(`Pedido: ${pedido._id} | Valor: R$ ${pedido.totalAmountBRL}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.logger.log('✅ E-mail enviado com sucesso!');
    this.logger.debug('------------------------------------------------');
  }
}