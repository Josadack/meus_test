import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Categoria')
@Controller("/categoria")
export class CategoriaController{
    
    constructor(
        private readonly categoriaService:CategoriaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findall():Promise<Categoria[]>{
        return this.categoriaService.findAll()
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findByID(@Param("id", ParseIntPipe)id:number):Promise<Categoria>{
        return this.categoriaService.findByID(id)
    }

    @Get("/categoria/:categoria")
    @HttpCode(HttpStatus.OK)
    findByCategoria(@Param("categoria")categoria:string):Promise<Categoria[]>{
        return this.categoriaService.findByCategoria(categoria)
    }

    @Get("/descricao/:descricao")
    @HttpCode(HttpStatus.OK)
    findByDescricao(@Param("descricao")descricao:string):Promise<Categoria[]>{
        return this.categoriaService.findByDescricao(descricao)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()categoria:Categoria):Promise<Categoria>{
        return this.categoriaService.create(categoria)
    }
    
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()categoria:Categoria):Promise<Categoria>{
        return this.categoriaService.update(categoria)
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe)id:number){
        return this.categoriaService.delete(id)
    }
}