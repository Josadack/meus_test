import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./services/categoria.service";
import { CategoriaController } from "./controllers/categoria.controller";
import { ProdutoModule } from "../produtos/produto.module";

@Module({
    imports:[TypeOrmModule.forFeature([Categoria]),
    forwardRef(() => ProdutoModule),],
    controllers:[CategoriaController],
    providers:[CategoriaService],
    exports:[CategoriaService],
})
export class CategoriaModule{}