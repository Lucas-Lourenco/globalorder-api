import { Process, Processor, OnQueueFailed } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('notificacao')
export class OrdersProcessor {
  private readonly logger = new Logger(OrdersProcessor.name);

  @Process('enviar-email')
  async handleEnviarEmail(job: Job) {
    try {
  
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

      const totalFormatado = valorTotal ? valorTotal.toFixed(2) : '0.00';
      this.logger.debug(`💰 Valor Total: R$ ${totalFormatado}`);
   
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.logger.log('✅ E-mail enviado com sucesso!');
      this.logger.debug('------------------------------------------------');

    } catch (error) {
   
      this.logger.error(`❌ Falha ao processar e-mail do pedido ${job.data.pedidoId || 'desconhecido'}`);
      this.logger.error(`Erro técnico: ${error.message}`);
    
      throw error;
    }
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.warn(`⚠️ Job ${job.id} falhou definitivamente. Motivo: ${error.message}`);
  }
}