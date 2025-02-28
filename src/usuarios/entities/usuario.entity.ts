import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Produto } from "../../produtos/entities/produto.entity"
import { Transform, TransformFnParams } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    @ApiProperty() 
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()  
    nome: string

    @IsEmail()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"}) 
    usuario: string

    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @ApiProperty() 
    data_nasc: string;

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @ApiProperty() 
    senha: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    foto: string

    @ApiProperty() 
    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto[]

}
