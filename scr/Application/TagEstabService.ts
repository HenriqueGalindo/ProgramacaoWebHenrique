import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

class TagEstabService{
    async create (data: { estabId: number, tagS: string }) {
        return prisma.tagEstab.create({data});
    }

    async delete (estabId: number, tagS: string) {
        await prisma.tagEstab.delete({where: {estabId_tagS: {estabId, tagS}}});
    }
}

export default new TagEstabService();