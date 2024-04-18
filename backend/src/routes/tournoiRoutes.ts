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
        const tournoi = await Tournoi.findByIdAndUpdate(req.params.id, { nomDuTournoi, reglement, equipesParticipantes, matchs }, { new: true }).populate('equipesParticipantes matchs');
        if (!tournoi) {
            return res.status(404).json({ message: 'Tournoi non trouvé' });
        }
        res.status(200).json(tournoi);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du tournoi', error: (error as Error).message });
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
