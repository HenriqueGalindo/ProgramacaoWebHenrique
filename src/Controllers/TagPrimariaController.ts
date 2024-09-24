import express, { Request, Response } from 'express';
import TagPrimariaService from '../Application/TagPrimariaService';

const router = express.Router();

// Criar uma nova Tag Primária
router.post('/tags_primarias', async (req: Request, res: Response) => {
    const { nomeTag } = req.body;
    try {
        const tagPrimaria = await TagPrimariaService.create(nomeTag);
        res.status(201).json(tagPrimaria);
    } catch (error) {
        console.error("Erro ao criar Tag Primária:", error);
        res.status(500).json({ error: "Erro ao criar Tag Primária." });
    }
});

// Obter uma Tag Primária por nome
router.get('/tags_primarias/:nomeTag', async (req: Request, res: Response) => {
    const { nomeTag } = req.params;
    try {
        const tagPrimaria = await TagPrimariaService.getByNome(nomeTag);
        if (!tagPrimaria) {
            return res.status(404).json({ error: "Tag Primária não encontrada." });
        }
        res.status(200).json(tagPrimaria);
    } catch (error) {
        console.error("Erro ao obter Tag Primária:", error);
        res.status(500).json({ error: "Erro ao obter Tag Primária." });
    }
});

// Obter todas as Tags Primárias
router.get('/tags_primarias', async (req: Request, res: Response) => {
    try {
        const tagsPrimarias = await TagPrimariaService.getAll();
        res.status(200).json(tagsPrimarias);
    } catch (error) {
        console.error("Erro ao obter Tags Primárias:", error);
        res.status(500).json({ error: "Erro ao obter Tags Primárias." });
    }
});

// Deletar uma Tag Primária
router.delete('/tags_primarias/:nomeTag', async (req: Request, res: Response) => {
    const { nomeTag } = req.params;
    try {
        await TagPrimariaService.delete(nomeTag);
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar Tag Primária:", error);
        res.status(500).json({ error: "Erro ao deletar Tag Primária." });
    }
});

export default router;