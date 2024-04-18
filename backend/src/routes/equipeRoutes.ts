import { Router, Request, Response } from "express";
import Equipe from "../models/Equipe";

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const equipes = await Equipe.find().populate('joueurs manager');
    if (!equipes.length) {
        return res.status(404).json({ message: 'Aucune équipe trouvée' });
    }
    res.status(200).json(equipes);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nom, budget, manager, joueurs } = req.body;
        const equipe = new Equipe({ nom, budget, manager, joueurs });
        await equipe.save();
        res.status(201).json(equipe);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l\'équipe', error: (error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const equipe = await Equipe.findById(req.params.id).populate('joueurs manager');
    if (!equipe) {
        return res.status(404).json({ message: 'Équipe non trouvée' });
    }
    res.status(200).json(equipe);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { nom, budget, manager, joueurs } = req.body;
        const equipe = await Equipe.findByIdAndUpdate(req.params.id, { nom, budget, manager, joueurs }, { new: true }).populate('joueurs manager');
        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }
        res.status(200).json(equipe);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de l\'équipe', error: (error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await Equipe.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Équipe non trouvée' });
    }
    res.status(204).send();
});

export default router;
