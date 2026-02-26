import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix as per infrastructure design blueprint
  app.setGlobalPrefix('api/v1');

  // Enable CORS for the local SPA
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Run the backend gateway on port 3001 to avoid colliding with Next.js
  await app.listen(3001);
  console.log(`[Sovereign Gateway] Active on port 3001`);
}
bootstrap();
