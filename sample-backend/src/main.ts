import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap()
  .then(() => {
    console.log(`Application is running on: 3000`);
  })
  .catch((err) => {
    console.error('Error starting the application:', err);
    process.exit(1);
  });
