import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // 1. Carrega o arquivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Conecta ao MongoDB usando a URL do .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}