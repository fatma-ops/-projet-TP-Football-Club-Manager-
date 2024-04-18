import { Router, Request, Response } from "express";
import UserModel , {IUtilisateur} from "../models/User"
import bcrypt from 'bcrypt';

const router = Router();

// Signup


router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { nom, email, motDePasse, role } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Hash du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);

    // Création de l'utilisateur
    const newUser: IUtilisateur = new UserModel({
      nom ,
      email,
      motDePasse: hashedPassword,
      role ,
      club: req.body.club 
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
});

export default router;
























