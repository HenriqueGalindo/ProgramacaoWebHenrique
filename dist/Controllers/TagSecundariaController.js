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
const TagSecundariaService_1 = __importDefault(require("../Application/TagSecundariaService"));
const router = express_1.default.Router();
// Criar uma nova Tag Secundária
router.post('/tags_secundarias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const tagSecundaria = yield TagSecundariaService_1.default.create(data);
        res.status(201).json(tagSecundaria);
    }
    catch (error) {
        console.error("Erro ao criar Tag Secundária:", error);
        res.status(500).json({ error: "Erro ao criar Tag Secundária." });
    }
}));
// Obter uma Tag Secundária por nome
router.get('/tags_secundarias/:nomeTag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTag } = req.params;
    try {
        const tagSecundaria = yield TagSecundariaService_1.default.getByNome(nomeTag);
        if (!tagSecundaria) {
            return res.status(404).json({ error: "Tag Secundária não encontrada." });
        }
        res.status(200).json(tagSecundaria);
    }
    catch (error) {
        console.error("Erro ao obter Tag Secundária:", error);
        res.status(500).json({ error: "Erro ao obter Tag Secundária." });
    }
}));
// Obter Tags Secundárias por Tag Primária
router.get('/tags_secundarias/:tagP', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagP } = req.query;
    if (typeof tagP !== 'string') {
        return res.status(400).json({ error: "Parâmetro 'tagP' deve ser uma string." });
    }
    try {
        const tagsSecundarias = yield TagSecundariaService_1.default.getByTagP(tagP);
        res.status(200).json(tagsSecundarias);
    }
    catch (error) {
        console.error("Erro ao obter Tags Secundárias:", error);
        res.status(500).json({ error: "Erro ao obter Tags Secundárias." });
    }
}));
// Deletar uma Tag Secundária
router.delete('/tags_secundarias/:nomeTag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nomeTag } = req.params;
    try {
        yield TagSecundariaService_1.default.delete(nomeTag);
        res.status(204).send();
    }
    catch (error) {
        console.error("Erro ao deletar Tag Secundária:", error);
        res.status(500).json({ error: "Erro ao deletar Tag Secundária." });
    }
}));
exports.default = router;
