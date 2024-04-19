import {Request, Response} from 'express';
import User, {IUtilisateur} from './../models/User';
import bcrypt from 'bcrypt';
import Equipe from "./../models/Equipe";
export const signUp = async (req: Request, res: Response) => {
  try {
    const { nom, email, motDePasse, club } = req.body;

    if (!nom || !email || !motDePasse || !club) {
      res.status(400).send({ message: 'Tous les champs sont requis.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).send({ message: 'Adresse e-mail invalide.' });
      console.log('Adresse e-mail invalide.');
      return;
    }

    if (motDePasse.length < 8) {
      res.status(400).send({ message: 'Le mot de passe doit comporter au moins 8 caractères.' });
      console.log('Le mot de passe doit comporter au moins 8 caractères.');
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
      isAdmin: false,
      club: null
    });

    await newUser.save();

    const findUser = await User.findOne({ email });

    if (findUser) {
      const equipe = new Equipe({
        nom: club,
        budget: 1000000,
        manager: findUser._id,
        joueurs: []
      });

        await equipe.save();

        await User.findByIdAndUpdate(findUser._id, { club: equipe._id });
    } else {
      res.status(404).send({message: 'Utilisateur non trouvé.'});
    }

  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw new Error('Une erreur est survenue lors de la création de l\'utilisateur.');
  }
};


