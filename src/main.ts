import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Dish Dash')
  .setDescription('Projeto DishDash 📖.')  
  .setContact('Grupo_03_js6', 'https://github.com/projetointegrador-g3/dish_dash', 'grupo03js06@gmail.com')  
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);


  process.env.TZ = '-03:00';

  //Habilitando globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

  //Habilitar o CORS na aplicação
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
