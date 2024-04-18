import { Router, Request, Response } from "express";
import Match from "../models/Match";

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const matches = await Match.find().populate('equipeA equipeB');
    if (!matches.length) {
        return res.status(404).json({ message: 'Aucun match trouvé' });
    }
    res.status(200).json(matches);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { equipeA, equipeB, scoreA, scoreB, dateDuMatch } = req.body;
        const match = new Match({ equipeA, equipeB, scoreA, scoreB, dateDuMatch });
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création du match', error: (error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const match = await Match.findById(req.params.id).populate('equipeA equipeB');
    if (!match) {
        return res.status(404).json({ message: 'Match non trouvé' });
    }
    res.status(200).json(match);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { equipeA, equipeB, scoreA, scoreB, dateDuMatch } = req.body;
        const match = await Match.findByIdAndUpdate(req.params.id, { equipeA, equipeB, scoreA, scoreB, dateDuMatch }, { new: true }).populate('equipeA equipeB');
        if (!match) {
            return res.status(404).json({ message: 'Match non trouvé' });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du match', error: (error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await Match.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Match non trouvé' });
    }
    res.status(204).send();
});

export default router;
