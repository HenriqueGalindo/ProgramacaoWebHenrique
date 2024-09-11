import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class TagEstabService{
    async create (data: { estabId: number, tagS: string }) {
        return prisma.tagEstab.create({data});
    }
}

export default new TagEstabService();