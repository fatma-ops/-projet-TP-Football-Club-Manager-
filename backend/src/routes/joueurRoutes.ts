import { Router, Request, Response } from "express";
import Joueur from "../models/Joueur";

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const joueurs = await Joueur.find().populate('equipe');
    if (!joueurs.length) {
        return res.status(404).json({ message: 'Aucun joueur trouvé' });
    }
    res.status(200).json(joueurs);
});

router.get('/market', async (_req: Request, res: Response) => {
    const joueurs = await Joueur.find( { equipe: null });
    if (!joueurs.length) {
        return res.status(404).json({ message: 'Aucun joueur trouvé' });
    }
    res.status(200).json(joueurs);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nom, age, nationalite, position, valeur, equipe } = req.body;
        const joueur = new Joueur({ nom, age, nationalite, position, valeur, equipe });
        await joueur.save();
        res.status(201).json(joueur);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création du joueur', error: (error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const joueur = await Joueur.findById(req.params.id).populate('equipe');
    if (!joueur) {
        return res.status(404).json({ message: 'Joueur non trouvé' });
    }
    res.status(200).json(joueur);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { nom, age, nationalite, position, valeur, equipe } = req.body;
        const joueur = await Joueur.findByIdAndUpdate(req.params.id, { nom, age, nationalite, position, valeur, equipe }, { new: true }).populate('equipe');
        if (!joueur) {
            return res.status(404).json({ message: 'Joueur non trouvé' });
        }
        res.status(200).json(joueur);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du joueur', error: (error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await Joueur.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Joueur non trouvé' });
    }
    res.status(204).send();
});

export default router;
