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
const TagPrimariaService_1 = __importDefault(require("../Application/TagPrimariaService"));
const router = express_1.default.Router();
// Criar uma nova Tag Primária
router.post('/tags_primarias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTag } = req.body;
    try {
        const tagPrimaria = yield TagPrimariaService_1.default.create(nomeTag);
        res.status(201).json(tagPrimaria);
    }
    catch (error) {
        console.error("Erro ao criar Tag Primária:", error);
        res.status(500).json({ error: "Erro ao criar Tag Primária." });
    }
}));
// Obter uma Tag Primária por nome
router.get('/tags_primarias/:nomeTag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTag } = req.params;
    try {
        const tagPrimaria = yield TagPrimariaService_1.default.getByNome(nomeTag);
        if (!tagPrimaria) {
            return res.status(404).json({ error: "Tag Primária não encontrada." });
        }
        res.status(200).json(tagPrimaria);
    }
    catch (error) {
        console.error("Erro ao obter Tag Primária:", error);
        res.status(500).json({ error: "Erro ao obter Tag Primária." });
    }
}));
// Obter todas as Tags Primárias
router.get('/tags_primarias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagsPrimarias = yield TagPrimariaService_1.default.getAll();
        res.status(200).json(tagsPrimarias);
    }
    catch (error) {
        console.error("Erro ao obter Tags Primárias:", error);
        res.status(500).json({ error: "Erro ao obter Tags Primárias." });
    }
}));
// Deletar uma Tag Primária
router.delete('/tags_primarias/:nomeTag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTag } = req.params;
    try {
        yield TagPrimariaService_1.default.delete(nomeTag);
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar Tag Primária:", error);
        res.status(500).json({ error: "Erro ao deletar Tag Primária." });
    }
}));
exports.default = router;
