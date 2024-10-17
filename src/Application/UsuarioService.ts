import { PrismaClient } from "@prisma/client";
import UsuarioEstabSalvosService from './UsuarioEstabSalvosService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient;
const jwtSecretKey = "Chave secreta";

class UsuarioService {

    async login(username: string, senha: string) {

        const usuario = await prisma.usuario.findUnique({where: {username}});
        if (!usuario){
            throw new Error ('Usuário não encontrado!');
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            throw new Error('Senha inválida');
        }
    
        return jwt.sign({ id: usuario.id }, jwtSecretKey, { expiresIn: '1h' });
    }

    async create (data: { username: string, senha: string }) {
        return prisma.usuario.create({data});
    }

    async getById (id: number) {
        return prisma.usuario.findUnique({where: {id}, 
            include: {estabSalvos: {include: {estabelecimento: true}}}});
    }

    async updateSenha (id: number, data: {senha: string}){
        return prisma.usuario.update({where: {id}, data});
    }

    async delete (id: number) {
        await prisma.usuario.delete({where: {id}});
    }

    async salvaFavorito (usuarioId: number, estabId: number) {
        return UsuarioEstabSalvosService.create({usuarioId, estabId});
    }

    async deleteFavorito (usuarioId: number, estabId: number) {
        await UsuarioEstabSalvosService.delete(usuarioId, estabId);
    }

}

export default new UsuarioService();