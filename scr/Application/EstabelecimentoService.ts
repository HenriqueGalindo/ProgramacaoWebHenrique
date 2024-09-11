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
    
    async associaTagS(estabId: number, tagS: string) {
        return TagEstabService.create({estabId, tagS});
    }

    async buscarEstabelecimentos(cidade: string, tagsSecundarias: string[]) {
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