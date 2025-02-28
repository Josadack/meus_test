import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { CategoriaModule } from "../categorias/categoria.module";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.services";

@Module({
    imports:[TypeOrmModule.forFeature([Produto]), forwardRef(() => CategoriaModule) ],
    controllers: [ProdutoController],
    providers: [ProdutoService],
    exports: [TypeOrmModule],
})

export class ProdutoModule {}