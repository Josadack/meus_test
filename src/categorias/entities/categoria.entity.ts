import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";
import { Transform, TransformFnParams } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name:"tb_categoria"})
export class Categoria{
    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id:number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:255, nullable:false})
    @ApiProperty() 
    categoria:string

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length:500, nullable:false})
    @ApiProperty() 
    descricao:string

    @ApiProperty() 
    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[];

}