import {PrismaClient, TagPrimaria} from "@prisma/client";

const prisma = new PrismaClient;

class TagPrimariaService {

    async create (nomeTag: string) {
        return prisma.tagPrimaria.create({data: {nomeTag}});
    }

    async getByNome (nomeTag: string) {
        return prisma.tagPrimaria.findUnique({where: {nomeTag}});
    }

    async getAll () {
        return prisma.tagPrimaria.findMany();
    }

}

export default new TagPrimariaService();