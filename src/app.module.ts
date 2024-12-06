import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import LoggerMiddleware from './middleware/logger.middleware';
import env from './config/configuation';
import { WinstonModule } from 'nest-winston';
import winstonLogger from './config/winston';
import { DemoController } from './module/demo/app.controller';
import { DemoService } from './module/demo/app.service';
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
  controllers: [DemoController],
  providers: [DemoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
