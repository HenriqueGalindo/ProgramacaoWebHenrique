import {PrismaClient, TagSecundaria} from "@prisma/client";

const prisma = new PrismaClient;

class TagSecundariaService {

    async create (data: TagSecundaria) {
        return prisma.tagSecundaria.create({data});
    }

    async getByNome (nomeTag: string) {
        return prisma.tagSecundaria.findUnique({where: {nomeTag}});
    }

    async getByTagP (tagP: string) {
        return prisma.tagSecundaria.findMany({where: {tagP}});
    }

}