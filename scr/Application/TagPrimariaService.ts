import {PrismaClient, TagPrimaria} from "@prisma/client";

const prisma = new PrismaClient;

class TagPrimariaService {

    async create (nome: string) {
        return prisma.tagPrimaria.create({nome});
    }

    async getByNome (nome: string) {
        return prisma.tagPrimaria.findUnique({where: {nome}});
    }

    async getAll () {
        return prisma.tagPrimaria.getAll();
    }

}

export default new TagPrimariaService();