import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const users = await User.find();
    if (!users.length) {
        return res.status(404).json({ message: "Pas d'utilisateur trouvé" });
    }
    res.status(200).json(users);
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email, motDePasse, role, club } = req.body;
        const user = new User({ name, email, motDePasse, role, club });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création de l'utilisateur", error: (error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).populate({ path: 'club', populate: "joueurs"});
    if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { name, email, motDePasse, role, club } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, motDePasse, role, club }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error: (error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(204).send();
});

export default router;
