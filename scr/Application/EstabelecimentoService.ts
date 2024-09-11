import { PrismaClient, Estabelecimento } from "@prisma/client";
import TagEstabService from "./TagEstabService";

const prisma = new PrismaClient;

class EstabelecimentoService {

    async create (data: Estabelecimento) {
        return prisma.estabelecimento.create({data});
    }

    async getById (id: number) {
        return prisma.estabelecimento.findUnique({where: {id}});
    }

    async update(
        id: number, 
        data: {
          nome: string, 
          cidade: string, 
          bairro: string, 
          rua: string, 
          numero: string, 
          descricao: string, 
          imagens: string[]
        }) {
        return prisma.estabelecimento.update({where: { id }, data});
    }

    async delete (id: number) {
        await prisma.estabelecimento.delete({where: {id}});
    }
    
    async associaTagS(estabId: number, tagS: string) {
        const estabelecimento = await prisma.estabelecimento.findUnique({
            where: { id: estabId }, include: { tagPrimaria: true }});
        
            if (!estabelecimento) {
            throw new Error("Estabelecimento não encontrado.");
        }

        const tagSecundaria = await prisma.tagSecundaria.findUnique({
            where: { nomeTag: tagS }, include: { tagPrimaria: true }});
       
        if (!tagSecundaria) {
            throw new Error("Tag secundária não encontrada.");
        }

        if (estabelecimento.tagPrimaria.nomeTag !== tagSecundaria.tagPrimaria.nomeTag) {
            throw new Error("A tag secundária e o estabelecimento não compartilham a mesma tag primária.");
        }
        return TagEstabService.create({estabId, tagS});
    }

    async deleteAssociacao(estabId: number, tagS: string) {
        return TagEstabService.delete(estabId, tagS);
    }

    async buscaEstabelecimentos(cidade: string, tagsSecundarias: string[]) {
        const estabelecimentos = await prisma.estabelecimento.findMany({
            where: {
                cidade, 
            },
            include: {
                tagsEstab: true 
            }
        });

        return estabelecimentos.filter(estab => 
            tagsSecundarias.every(tag => 
                estab.tagsEstab.some(tagEstab => tagEstab.tagS == tag)
            )
        );
    }

}

export default new EstabelecimentoService();