import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import LoggerMiddleware from './middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import env from './config/configuation';
import { WinstonModule } from 'nest-winston';
import winstonLogger from './config/winston';
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: winstonLogger.transports,
      format: winstonLogger.format,
      defaultMeta: winstonLogger.defaultMeta,
      exitOnError: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
