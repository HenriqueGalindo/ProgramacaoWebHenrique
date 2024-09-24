import express, { Request, Response } from 'express';
import EstabelecimentoService from '../Application/EstabelecimentoService';

const router = express.Router();

// Criar um novo estabelecimento
router.post('/estabelecimentos', async (req: Request, res: Response) => {
    try {
        const estabelecimento = await EstabelecimentoService.create(req.body);
        res.status(201).json(estabelecimento);
    } catch (error) {
        console.error("Erro ao criar estabelecimento:", error);
        res.status(500).json({ error: "Erro ao criar estabelecimento." });
    }
});

// Obter um estabelecimento por ID
router.get('/estabelecimentos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const estabelecimento = await EstabelecimentoService.getById(Number(id));
        if (!estabelecimento) {
            return res.status(404).json({ error: "Estabelecimento não encontrado." });
        }
        res.status(200).json(estabelecimento);
    } catch (error) {
        console.error("Erro ao obter estabelecimento:", error);
        res.status(500).json({ error: "Erro ao obter estabelecimento." });
    }
});

// Atualizar um estabelecimento
router.patch('/estabelecimentos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, cidade, bairro, rua, numero, descricao, imagens } = req.body;
    try {
        const estabelecimento = await EstabelecimentoService.update(Number(id), {
            nome, cidade, bairro, rua, numero, descricao, imagens
        });
        if (!estabelecimento) {
            return res.status(404).json({ error: "Estabelecimento não encontrado." });
        }
        res.status(200).json(estabelecimento);
    } catch (error) {
        console.error("Erro ao atualizar estabelecimento:", error);
        res.status(500).json({ error: "Erro ao atualizar estabelecimento." });
    }
});

// Deletar um estabelecimento
router.delete('/estabelecimentos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await EstabelecimentoService.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar estabelecimento:", error);
        res.status(500).json({ error: "Erro ao deletar estabelecimento." });
    }
});

// Associar uma tag secundária a um estabelecimento
router.post('/estabelecimentos/:estabId/tags/:tagS', async (req: Request, res: Response) => {
    const { estabId, tagS } = req.params;
    try {
        const associacao = await EstabelecimentoService.associaTagS(Number(estabId), tagS);
        res.status(201).json(associacao);
    } catch (error) {
        console.error("Erro ao associar tag:", error);
        res.status(500).json({ error: "Erro ao associar tag." });
    }
});

// Remover a associação de uma tag secundária de um estabelecimento
router.delete('/estabelecimentos/:estabId/tags/:tagS', async (req: Request, res: Response) => {
    const { estabId, tagS } = req.params;
    try {
        await EstabelecimentoService.deleteAssociacao(Number(estabId), tagS);
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao remover associação de tag:", error);
        res.status(500).json({ error: "Erro ao remover associação de tag." });
    }
});

// Buscar estabelecimentos por cidade e tags secundárias
router.get('/estabelecimentos/busca', async (req: Request, res: Response) => {
    const { cidade, tagsSecundarias } = req.query;
    if (!cidade || !Array.isArray(tagsSecundarias)) {
        return res.status(400).json({ error: "Parâmetros de busca inválidos." });
    }
    try {
        const estabelecimentos = await EstabelecimentoService.buscaEstabelecimentos(cidade as string, tagsSecundarias as string[]);
        res.status(200).json(estabelecimentos);
    } catch (error) {
        console.error("Erro ao encontrar estabelecimentos:", error);
        res.status(500).json({ error: "Erro ao encontrar estabelecimentos." });
    }
});

export default router;
