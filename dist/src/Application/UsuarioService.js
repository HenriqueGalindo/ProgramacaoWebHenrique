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
const UsuarioEstabSalvosService_1 = __importDefault(require("./UsuarioEstabSalvosService"));
const prisma = new client_1.PrismaClient;
class UsuarioService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.usuario.create({ data });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.usuario.findUnique({ where: { id },
                include: { estabSalvos: { include: { estabelecimento: true } } } });
        });
    }
    updateSenha(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.usuario.update({ where: { id }, data });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.usuario.delete({ where: { id } });
        });
    }
    salvaFavorito(usuarioId, estabId) {
        return __awaiter(this, void 0, void 0, function* () {
            return UsuarioEstabSalvosService_1.default.create({ usuarioId, estabId });
        });
    }
    deleteFavorito(usuarioId, estabId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UsuarioEstabSalvosService_1.default.delete(usuarioId, estabId);
        });
    }
}
exports.default = new UsuarioService();
