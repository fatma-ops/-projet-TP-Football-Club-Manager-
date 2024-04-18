import mongoose from 'mongoose';
import express, { Express, Request, Response } from "express";
import equipeRoutes from './routes/equipeRoutes';
import joueurRoutes from './routes/joueurRoutes';
import userRoutes from './routes/userRoutes';
import matchRoutes from './routes/matchRoutes';
import tournoiRoutes from './routes/tournoiRoutes';

// Middleware pour le parsing de JSON doit venir avant les routes
app.use(express.json());

// Définition des routes
app.use('/api/users', userRoutes);
app.use('/api/joueurs', joueurRoutes);
app.use('/api/equipes', equipeRoutes); 
app.use('/api/matchs', matchRoutes); 
app.use('/api/tournois', tournoiRoutes);

// URI de connexion à MongoDB
const uri = "mongodb+srv://fatma:Vh7Lig6lgIaIRU91@cluster0.1sydj3x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    try {
        await mongoose.connect(uri);
        console.log("Base de données connectée avec succès !");
    } catch (e) {
        console.error("Erreur de connexion à la base de données:", e);
    }
}

run().catch(console.dir);

// Middleware pour gérer les erreurs
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé!');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur fonctionne sur le port ${port}`);
});
