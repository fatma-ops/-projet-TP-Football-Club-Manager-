import { Router, Request, Response } from "express";
import User , {IUtilisateur}  from "../models/User";
import { signUp  } from '../controller/userController';
import bcrypt from 'bcrypt'

const router = Router();


router.get('/', async (_req: Request, res: Response) => {
    const users = await User.find();
    if (!users.length) {
        return res.status(404).json({ message: "Pas d'utilisateur trouvé" });
    }
    res.status(200).json(users);
});

router.post('/signup', async (req: Request, res: Response) => {
    try {
      const user = await signUp(req, res); 
      res.status(201).json(user); 
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
  });

  router.post('/signin', async (req: Request, res: Response ,next) => {
    try {
        const { email, motDePasse }: Pick<IUtilisateur, "email" | "motDePasse"> = req.body;

        const utilisateur = await User.findOne({ email });
        if (!utilisateur) {
            return res.status(400).send({ message: "L'email  est incorrect." });
        }

        const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!motDePasseValide) {
            return res.status(400).send({ message: "le mot de passe est incorrect." });
        }

        return res.status(200).json(utilisateur);
    } catch (error ) {
        res.status(500).send({ message: error});
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
        const { name, email, motDePasse, isAdmin, club } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, motDePasse, isAdmin, club }, { new: true });
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

export default router ;

