import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class UsuarioEstabSalvosService{
    async create (data: { usuarioId: number, estabId: number }) {
        return prisma.usuarioEstabSalvos.create({data});
    }

    async delete (usuarioId: number, estabId: number) {
        await prisma.usuarioEstabSalvos.delete({where: {usuarioId_estabId: {usuarioId, estabId}}});
    }

}

export default new UsuarioEstabSalvosService();