import express, { Request, Response } from 'express';
import TagSecundariaService from '../Application/TagSecundariaService';

const router = express.Router();

// Criar uma nova Tag Secundária
router.post('/tags_secundarias', async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const tagSecundaria = await TagSecundariaService.create(data);
        res.status(201).json(tagSecundaria);
    } catch (error) {
        console.error("Erro ao criar Tag Secundária:", error);
        res.status(500).json({ error: "Erro ao criar Tag Secundária." });
    }
});

// Obter uma Tag Secundária por nome
router.get('/tags_secundarias/:nomeTag', async (req: Request, res: Response) => {
    const { nomeTag } = req.params;
    try {
        const tagSecundaria = await TagSecundariaService.getByNome(nomeTag);
        if (!tagSecundaria) {
            return res.status(404).json({ error: "Tag Secundária não encontrada." });
        }
        res.status(200).json(tagSecundaria);
    } catch (error) {
        console.error("Erro ao obter Tag Secundária:", error);
        res.status(500).json({ error: "Erro ao obter Tag Secundária." });
    }
});

// Obter Tags Secundárias por Tag Primária
router.get('/tags_secundarias/:tagP', async (req: Request, res: Response) => {
    const { tagP } = req.query;
    if (typeof tagP !== 'string') {
        return res.status(400).json({ error: "Parâmetro 'tagP' deve ser uma string." });
    }
    try {
        const tagsSecundarias = await TagSecundariaService.getByTagP(tagP);
        res.status(200).json(tagsSecundarias);
    } catch (error) {
        console.error("Erro ao obter Tags Secundárias:", error);
        res.status(500).json({ error: "Erro ao obter Tags Secundárias." });
    }
});

// Deletar uma Tag Secundária
router.delete('/tags_secundarias/:nomeTag', async (req: Request, res: Response) => {
    const { nomeTag } = req.params;
    try {
        await TagSecundariaService.delete(nomeTag);
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar Tag Secundária:", error);
        res.status(500).json({ error: "Erro ao deletar Tag Secundária." });
    }
});

export default router;
