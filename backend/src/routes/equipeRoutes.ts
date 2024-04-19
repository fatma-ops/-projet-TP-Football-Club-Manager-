import { Router, Request, Response } from "express";
import Equipe from "../models/Equipe";
import Match from "../models/Match";

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

//TODO faire les matchs de l'équipe

router.get('/:id/matches', async (req: Request, res: Response) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }
        const matchByEquipe = await Match.find({ $or: [{ equipeA: req.params.id }, { equipeB: req.params.id }] }).populate('equipeA equipeB');
        res.status(200).json(matchByEquipe);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la récupération des matchs', error: (error as Error).message });
    }
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
