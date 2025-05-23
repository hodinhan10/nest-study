import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Swagger config
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The API documentation for carts & auth')
    .setVersion('1.0')
    .addBearerAuth() // Cho phép dùng JWT token trong Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
