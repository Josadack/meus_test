import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './produtos/entities/produto.entity';
import { CategoriaModule } from './categorias/categoria.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { ProdutoModule } from './produtos/produto.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Categoria } from './categorias/entities/categoria.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true,

    }),
    UsuarioModule,
    CategoriaModule,
    ProdutoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
