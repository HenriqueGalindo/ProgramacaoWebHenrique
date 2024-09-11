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

    async delete (nomeTag: string) {
        await prisma.tagPrimaria.delete({where: {nomeTag}});
    }

}

export default new TagPrimariaService();