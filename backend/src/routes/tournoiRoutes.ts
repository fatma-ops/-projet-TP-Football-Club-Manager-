import { Router, Request, Response } from "express";
import Tournoi from "../models/Tournoi";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const tournois = await Tournoi.find().populate('equipesParticipantes matchs');
    if (!tournois.length) {
        return res.status(404).json({ message: 'Pas de tournoi trouvé' });
    }
    res.status(200).json(tournois);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nomDuTournoi, reglement, equipesParticipantes, matchs } = req.body;
        const newTournoi = new Tournoi({ nomDuTournoi, reglement, equipesParticipantes, matchs });
        await newTournoi.save();
        res.status(201).json(newTournoi);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création du tournoi', error });
    }
});


router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await Tournoi.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Tournoi non trouvé' });
    }
    res.status(204).send();
});

export default router;
