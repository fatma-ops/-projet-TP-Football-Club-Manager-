import { Router, Request, Response } from "express";
import Equipe from "../models/Equipe";
import Match from "../models/Match";
import joueur from "../models/Joueur";

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

router.get('/:id/matches', async (req: Request, res: Response) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }
        const matchByEquipe = await Match.find({ $or: [{ equipeA: req.params.id }, { equipeB: req.params.id }] }).populate('equipeA equipeB');

        if (!matchByEquipe.length) {
            return res.status(404).json({ message: 'Aucun match trouvé' });
        }

        const today = new Date();

        const matchByEquipeTodayOrLater = matchByEquipe.filter((match) => {
            return match.dateDuMatch >= today;
        });

        res.status(200).json(matchByEquipeTodayOrLater);
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

router.put('/:id/ajouter/:joueurId', async (req: Request, res: Response) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }

        const joueurSelectionne = await joueur.findById(req.params.joueurId);

        if (!joueurSelectionne) {
            return res.status(404).json({ message: 'Joueur non trouvé' });
        }

        equipe.joueurs.push(req.params.joueurId);
        equipe.budget -= joueurSelectionne.valeur;
        await equipe.save();

        await joueur.findByIdAndUpdate(req.params.joueurId, { equipe: req.params.id }, { new: true });

        res.status(200).json(equipe);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de l\'ajout du joueur à l\'équipe', error: (error as Error).message });
    }
});

router.put('/:id/vendre/:joueurId', async (req: Request, res: Response) => {
    try {
        const equipe = await Equipe.findById(req.params.id);
        if (!equipe) {
            return res.status(404).json({ message: 'Équipe non trouvée' });
        }

        const joueurSelectionne = await joueur.findById(req.params.joueurId);

        if (!joueurSelectionne) {
            return res.status(404).json({ message: 'Joueur non trouvé' });
        }

        equipe.joueurs = equipe.joueurs.filter((joueur) => joueur != req.params.joueurId);
        equipe.budget += joueurSelectionne.valeur;
        await equipe.save();

        await joueur.findByIdAndUpdate(req.params.joueurId, { equipe: null }, { new: true });

        res.status(200).json(equipe);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la vente du joueur de l\'équipe', error: (error as Error).message });
    }
});

export default router;
