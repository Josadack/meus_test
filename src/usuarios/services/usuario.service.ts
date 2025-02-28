import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { differenceInYears } from 'date-fns';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    
    async findByUsuario(usuario: string): Promise<Usuario |   null > {
        return  await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }


    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({  
            relations: {  
              produto: true  }  
          }) 

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        });
        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async create(usuario: Usuario): Promise<Usuario> {

        const dataNascimento = usuario.data_nasc;  
        const [dia, mes, ano] = dataNascimento.split('-').map(Number);  
        const dataNascimentoDate = new Date(ano, mes - 1, dia);  
        const dataAtual = new Date();  
        const idade = differenceInYears(dataAtual, dataNascimentoDate);  
    
        if (idade < 18)  
          throw new HttpException('⚠️ Usuário deve ter pelo menos 18 anos', HttpStatus.NOT_FOUND); 
        
        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException("⚠️ O Usuario já existe!", HttpStatus.BAD_REQUEST);

        return await this.usuarioRepository.save(usuario);

    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuário já Cadastrado!', HttpStatus.BAD_REQUEST);

        await this.create(usuario)

        return await this.usuarioRepository.save(usuario);

    }

}