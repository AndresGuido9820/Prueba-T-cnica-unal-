import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentVariables } from './config/';

async function main() {
  const logger = new Logger("Gateway");
  const app = await NestFactory.create(AppModule);

  // 🔹 Habilitar un prefijo global para las rutas de la API
  app.setGlobalPrefix('api');

  // 🔹 Habilitar CORS correctamente
  app.enableCors({
    origin: '*', // Permite todas las peticiones (puedes cambiarlo por 'http://localhost:3000' si es necesario)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Si usas cookies o autenticación
  });

  // 🔹 Usar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Gateway is running on port ${environmentVariables.port}`);
}

main();

