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
const express_1 = __importDefault(require("express"));
const UsuarioService_1 = __importDefault(require("../Application/UsuarioService"));
const router = express_1.default.Router();
// Criar um novo usuário
router.post('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield UsuarioService_1.default.create(req.body);
        res.status(201).json(usuario);
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
}));
// Obter um usuário por ID
router.get('/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield UsuarioService_1.default.getById(Number(id));
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        res.json(usuario);
    }
    catch (error) {
        console.error("Erro ao obter usuário:", error);
        res.status(500).json({ error: "Erro ao obter usuário." });
    }
}));
// Deletar um usuário
router.delete('/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield UsuarioService_1.default.delete(Number(id));
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro ao deletar usuário." });
    }
}));
// Adicionar um estabelecimento aos favoritos de um usuário
router.post('/usuarios/:usuarioId/favoritos/:estabId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId, estabId } = req.params;
    try {
        const favorito = yield UsuarioService_1.default.salvaFavorito(Number(usuarioId), Number(estabId));
        res.status(201).json(favorito);
    }
    catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        res.status(500).json({ error: "Erro ao adicionar favorito." });
    }
}));
// Remover um estabelecimento dos favoritos de um usuário
router.delete('/usuarios/:usuarioId/favoritos/:estabId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId, estabId } = req.params;
    try {
        yield UsuarioService_1.default.deleteFavorito(Number(usuarioId), Number(estabId));
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao remover favorito:", error);
        res.status(500).json({ error: "Erro ao remover favorito." });
    }
}));
exports.default = router;
