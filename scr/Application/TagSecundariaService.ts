import {PrismaClient, TagPrimaria} from "@prisma/client";

const prisma = new PrismaClient;

class TagSecundariaService {

    async create (nome: string, tagP: string) {
        return prisma.tagSecundaria.create({nome, tagP});
    }

}