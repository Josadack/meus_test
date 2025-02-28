import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categoria.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";
import { NumericTransformer } from "../../util/numericTransformer";
import { forwardRef } from "@nestjs/common";

@Entity({name: 'tb_produtos'})
export class Produto {
    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()
    nome: string;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @ApiProperty() 
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: new NumericTransformer()})
    preco: number;

    @IsNotEmpty()
    @Column({length: 5000})
    @ApiProperty() 
    foto: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty() 
    info_nutricionais: string;

    // Relacionamento com Categoria
    @ApiProperty()
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {  
        onDelete: "CASCADE",  
        lazy: true // Ativa o lazy loading  
    })  
    categoria: Promise<Categoria>;  



    // Relacionamento com Usuario
    @ApiProperty() 
    @ManyToOne (() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}
