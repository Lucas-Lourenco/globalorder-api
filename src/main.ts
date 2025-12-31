import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('GlobalOrder API')
    .setDescription('API para gerenciamento de clientes e pedidos')
    .setVersion('1.0')
    .addTag('Clientes')
    .addTag('Pedidos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`🚀 Aplicação rodando em: http://localhost:3000`);
  console.log(`📃 Documentação Swagger em: http://localhost:3000/api`);
}
bootstrap();