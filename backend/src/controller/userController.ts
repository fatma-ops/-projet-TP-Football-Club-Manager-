
import { Request, Response } from 'express';
import User, { IUtilisateur } from './../models/User';
import bcrypt from 'bcrypt';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { nom, email, motDePasse, isAdmin, club } = req.body;

    if (!nom || !email || !motDePasse || !isAdmin || !club) {
      res.status(400).send({ message: 'Tous les champs sont requis.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).send({ message: 'Adresse e-mail invalide.' });
      return;
    }

    if (motDePasse.length < 8) {
      res.status(400).send({ message: 'Le mot de passe doit comporter au moins 8 caractères.' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ message: 'Cette adresse e-mail est déjà utilisée.' });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);

    const newUser: IUtilisateur = new User({
      nom,
      email,
      motDePasse: hashedPassword,
      isAdmin,
      club
    });

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw new Error('Une erreur est survenue lors de la création de l\'utilisateur.');
  }
};


