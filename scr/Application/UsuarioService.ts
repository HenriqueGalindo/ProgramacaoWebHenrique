import { PrismaClient, Usuario} from "@prisma/client";
import UsuarioEstabSalvosService from './UsuarioEstabSalvosService';

const prisma = new PrismaClient;

class UsuarioService {

    async create (data: Usuario) {
        return prisma.usuario.create({data});
    }

    async getById (id: number) {
        return prisma.usuario.findUnique({where: {id}, include: {estabSalvos: true}});
    }

    async saveFavorite (usuarioId: number, estabId: number) {
        return UsuarioEstabSalvosService.create({usuarioId, estabId});
    }

    async updateSenha (id: number, data: {senha: string}){
        return prisma.usuario.update({where: {id}, data});
    }

}