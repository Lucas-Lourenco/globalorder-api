import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('notificacao')
export class OrdersProcessor {
  private readonly logger = new Logger(OrdersProcessor.name);

  @Process('enviar-email')
  async handleEnviarEmail(job: Job) {
    
    const { nome, email, pedidoId, valorTotal, itens } = job.data;
    
    this.logger.debug('------------------------------------------------');
    this.logger.debug(`📧 SIMULANDO ENVIO DE E-MAIL...`);
    
    this.logger.debug(`Para: ${nome} <${email}>`);
    this.logger.debug(`Pedido ID: ${pedidoId}`);
    
    if (itens && Array.isArray(itens)) {
      this.logger.debug('🛒 ITENS DO PEDIDO:');
      itens.forEach((item, index) => {
        this.logger.debug(`   ${index + 1}. ${item.produto} (x${item.quantidade})`);
      });
    }

    this.logger.debug(`💰 Valor Total: R$ ${valorTotal.toFixed(2)}`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.logger.log('✅ E-mail enviado com sucesso!');
    this.logger.debug('------------------------------------------------');
  }
}