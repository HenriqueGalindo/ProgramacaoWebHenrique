import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class UsuarioEstabSalvosService{
    async create (data: { usuarioId: number, estabId: number }) {
        prisma.usuarioEstabSalvos.create({data});
    }
}

export default new UsuarioEstabSalvosService();