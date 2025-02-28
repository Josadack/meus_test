import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoriaService{

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository:Repository<Categoria>
    ){}

    async findAll():Promise<Categoria[]>{
        return this.categoriaRepository.find({
            relations:{produto: true}
        })
    }

    async findByID(id:number):Promise<Categoria>{
        const categoria=await this.categoriaRepository.findOne({
            where:{id},
            relations:{produto: true}
        })

        if(!categoria)
            throw new HttpException("Esta categoria de alimento não existe.", HttpStatus.NOT_FOUND)
            return categoria
    }

    async findByCategoria(categoria:string):Promise<Categoria[]>{
        return this.categoriaRepository.find({
            where:{categoria:ILike(`%${categoria}%`)},
            relations:{produto: true}
        })
    }

    async findByDescricao(descricao:string):Promise<Categoria[]>{
        return this.categoriaRepository.find({
            where:{descricao:ILike(`%${descricao}%`)},
            relations:{produto: true}
        })
    }

    async create(categoria:Categoria):Promise<Categoria>{
        return await this.categoriaRepository.save(categoria)
    }

    async update(categoria:Categoria):Promise<Categoria>{
        await this.findByID(categoria.id)
        return await this.categoriaRepository.save(categoria)
    }

    async delete(id:number):Promise<DeleteResult>{
        await this.findByID(id)
        return await this.categoriaRepository.delete(id)
    }
}