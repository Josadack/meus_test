import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.services";
import { Produto } from "../entities/produto.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Produto')
@Controller('/produtos')
export class ProdutoController{
    constructor(
        private readonly produtoService: ProdutoService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto>{
        return this.produtoService.findById(id)
    }

    @Get('/produto/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param ('nome') nome: string): Promise<Produto[]>{
        return this.produtoService.findByName(nome)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param ('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id)
    }

    // Buscar avançada por produtos saudaveis 
    @Get('saudavel/:saudavel')
    @HttpCode(HttpStatus.OK)
    findBySearch(): Promise<Produto[]>{
        return this.produtoService.findBySearch()
    }

    @Get('/promocao/:promo')  
    @HttpCode(HttpStatus.OK)  
    async getProdutosEmPromocao(): Promise<{ nome: string; preco: number; categoria: string }[]> {  
        return this.produtoService.getProdutosEmPromocao();  
    }  
}  
