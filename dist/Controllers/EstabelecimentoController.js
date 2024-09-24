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
const EstabelecimentoService_1 = __importDefault(require("../Application/EstabelecimentoService"));
const router = express_1.default.Router();
// Criar um novo estabelecimento
router.post('/estabelecimentos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estabelecimento = yield EstabelecimentoService_1.default.create(req.body);
        res.status(201).json(estabelecimento);
    }
    catch (error) {
        console.error("Erro ao criar estabelecimento:", error);
        res.status(500).json({ error: "Erro ao criar estabelecimento." });
    }
}));
// Obter um estabelecimento por ID
router.get('/estabelecimentos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estabelecimento = yield EstabelecimentoService_1.default.getById(Number(id));
        if (!estabelecimento) {
            return res.status(404).json({ error: "Estabelecimento não encontrado." });
        }
        res.status(200).json(estabelecimento);
    }
    catch (error) {
        console.error("Erro ao obter estabelecimento:", error);
        res.status(500).json({ error: "Erro ao obter estabelecimento." });
    }
}));
// Atualizar um estabelecimento
router.patch('/estabelecimentos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nome, cidade, bairro, rua, numero, descricao, imagens } = req.body;
    try {
        const estabelecimento = yield EstabelecimentoService_1.default.update(Number(id), {
            nome, cidade, bairro, rua, numero, descricao, imagens
        });
        if (!estabelecimento) {
            return res.status(404).json({ error: "Estabelecimento não encontrado." });
        }
        res.status(200).json(estabelecimento);
    }
    catch (error) {
        console.error("Erro ao atualizar estabelecimento:", error);
        res.status(500).json({ error: "Erro ao atualizar estabelecimento." });
    }
}));
// Deletar um estabelecimento
router.delete('/estabelecimentos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield EstabelecimentoService_1.default.delete(Number(id));
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar estabelecimento:", error);
        res.status(500).json({ error: "Erro ao deletar estabelecimento." });
    }
}));
// Associar uma tag secundária a um estabelecimento
router.post('/estabelecimentos/:estabId/tags/:tagS', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estabId, tagS } = req.params;
    try {
        const associacao = yield EstabelecimentoService_1.default.associaTagS(Number(estabId), tagS);
        res.status(201).json(associacao);
    }
    catch (error) {
        console.error("Erro ao associar tag:", error);
        res.status(500).json({ error: "Erro ao associar tag." });
    }
}));
// Remover a associação de uma tag secundária de um estabelecimento
router.delete('/estabelecimentos/:estabId/tags/:tagS', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estabId, tagS } = req.params;
    try {
        yield EstabelecimentoService_1.default.deleteAssociacao(Number(estabId), tagS);
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao remover associação de tag:", error);
        res.status(500).json({ error: "Erro ao remover associação de tag." });
    }
}));
// Buscar estabelecimentos por cidade e tags secundárias
router.get('/estabelecimentos/busca', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cidade, tagsSecundarias } = req.query;
    if (!cidade || !Array.isArray(tagsSecundarias)) {
        return res.status(400).json({ error: "Parâmetros de busca inválidos." });
    }
    try {
        const estabelecimentos = yield EstabelecimentoService_1.default.buscaEstabelecimentos(cidade, tagsSecundarias);
        res.status(200).json(estabelecimentos);
    }
    catch (error) {
        console.error("Erro ao encontrar estabelecimentos:", error);
        res.status(500).json({ error: "Erro ao encontrar estabelecimentos." });
    }
}));
exports.default = router;
