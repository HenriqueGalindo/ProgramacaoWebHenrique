import { PrismaClient, Usuario} from "@prisma/client";
import UsuarioEstabSalvosService from './UsuarioEstabSalvosService';

const prisma = new PrismaClient;

class UsuarioService {

    async create (data: Usuario) {
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