import { Schema, Document } from 'mongoose';
import {IEquipe} from "./Equipe";
import * as mongoose from "mongoose";

export interface IJoueur extends Document {
    id: string;
    nom: string;
    age: number;
    nationalite: string;
    position: string;
    valeur: number;
    equipe?: IEquipe;
}

const joueurSchema = new Schema({
    nom: { type: String, required: true },
    age: { type: Number, required: true },
    nationalite: { type: String, required: true },
    position: { type: String, required: true },
    valeur: { type: Number, required: true },
    equipe: { type: Schema.Types.ObjectId, ref: 'Equipe' }
});

const JoueurModel = mongoose.model<IJoueur>('Joueur', joueurSchema);

export default JoueurModel;