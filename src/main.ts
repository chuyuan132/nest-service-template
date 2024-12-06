import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix = configService.get('globalPrefix');
  const port = configService.get('port');
  app.setGlobalPrefix(globalPrefix ?? '');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(port ?? 300);
}
bootstrap();
