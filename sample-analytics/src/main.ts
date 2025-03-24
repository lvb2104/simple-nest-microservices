import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3002,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap()
  .then(() => {
    console.log('Microservice is listening on port 3002');
    console.log('Application is running on: 3003');
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });
