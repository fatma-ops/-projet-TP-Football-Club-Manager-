import { Router, Request, Response } from "express";
import User , {IUtilisateur} from "../models/User";
import bcrypt from 'bcrypt'

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await User.find();
    if (!users.length) {
        return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
});

router.post('/signup', async (req: Request, res: Response) => {
    try {
      const { nom, email, motDePasse, role, club } = req.body;
  
      if (!nom || !email || !motDePasse || !role || !club) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Adresse e-mail invalide.' });
      }
  
      if (motDePasse.length < 8) {
        return res.status(400).json({ message: 'Le mot de passe doit comporter au moins 8 caractères.' });
      }
  
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cette adresse e-mail est déjà utilisée.' });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);
  
      const newUser: IUtilisateur = new User({
        nom,
        email,
        motDePasse: hashedPassword,
        role,
        club
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
  });
router.get('/:id', async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { name, email, motDePasse, role, club } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, motDePasse, role, club }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: (error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
});

export default router;