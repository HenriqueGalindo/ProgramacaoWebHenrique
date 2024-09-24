"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const TagEstabService_1 = __importDefault(require("./TagEstabService"));
const prisma = new client_1.PrismaClient;
class EstabelecimentoService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.estabelecimento.create({ data });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.estabelecimento.findUnique({ where: { id } });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.estabelecimento.update({ where: { id }, data });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.estabelecimento.delete({ where: { id } });
        });
    }
    associaTagS(estabId, tagS) {
        return __awaiter(this, void 0, void 0, function* () {
            const estabelecimento = yield prisma.estabelecimento.findUnique({
                where: { id: estabId }, include: { tagPrimaria: true }
            });
            if (!estabelecimento) {
                throw new Error("Estabelecimento não encontrado.");
            }
            const tagSecundaria = yield prisma.tagSecundaria.findUnique({
                where: { nomeTag: tagS }, include: { tagPrimaria: true }
            });
            if (!tagSecundaria) {
                throw new Error("Tag secundária não encontrada.");
            }
            if (estabelecimento.tagPrimaria.nomeTag !== tagSecundaria.tagPrimaria.nomeTag) {
                throw new Error("A tag secundária e o estabelecimento não compartilham a mesma tag primária.");
            }
            return TagEstabService_1.default.create({ estabId, tagS });
        });
    }
    deleteAssociacao(estabId, tagS) {
        return __awaiter(this, void 0, void 0, function* () {
            return TagEstabService_1.default.delete(estabId, tagS);
        });
    }
    buscaEstabelecimentos(cidade, tagsSecundarias) {
        return __awaiter(this, void 0, void 0, function* () {
            const estabelecimentos = yield prisma.estabelecimento.findMany({
                where: { cidade, }, include: { tagsEstab: true }
            });
            return estabelecimentos.filter(estab => tagsSecundarias.every(tag => estab.tagsEstab.some(tagEstab => tagEstab.tagS == tag)));
        });
    }
}
exports.default = new EstabelecimentoService();
