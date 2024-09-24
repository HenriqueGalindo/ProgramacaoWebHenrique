import express, { Request, Response } from 'express';
import UsuarioService from '../Application/UsuarioService';

const router = express.Router();


// Criar um novo usuário
router.post('/usuarios', async (req: Request, res: Response) => {
    try {
        const usuario = await UsuarioService.create(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
});

// Obter um usuário por ID
router.get('/usuarios/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario = await UsuarioService.getById(Number(id));
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        res.json(usuario);
    } catch (error) {
        console.error("Erro ao obter usuário:", error);
        res.status(500).json({ error: "Erro ao obter usuário." });
    }
});

// Deletar um usuário
router.delete('/usuarios/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await UsuarioService.delete(Number(id));
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ error: "Erro ao deletar usuário." });
    }
});

// Adicionar um estabelecimento aos favoritos de um usuário
router.post('/usuarios/:usuarioId/favoritos/:estabId', async (req: Request, res: Response) => {
    const { usuarioId, estabId } = req.params;
    try {
        const favorito = await UsuarioService.salvaFavorito(Number(usuarioId), Number(estabId));
        res.status(201).json(favorito);
    } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        res.status(500).json({ error: "Erro ao adicionar favorito." });
    }
});

// Remover um estabelecimento dos favoritos de um usuário
router.delete('/usuarios/:usuarioId/favoritos/:estabId', async (req: Request, res: Response) => {
    const { usuarioId, estabId } = req.params;
    try {
        await UsuarioService.deleteFavorito(Number(usuarioId), Number(estabId));
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao remover favorito:", error);
        res.status(500).json({ error: "Erro ao remover favorito." });
    }
});

export default router;