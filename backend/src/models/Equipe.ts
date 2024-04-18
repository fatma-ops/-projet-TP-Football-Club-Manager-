import mongoose, { Schema, Document } from 'mongoose';
import {IJoueur} from "./Joueur";

export interface IEquipe extends Document {
    id: string;
    nom: string;
    budget: number;
    manager: string;
    joueurs: IJoueur[];
}

const equipeSchema = new Schema({
    nom: { type: String, required: true },
    budget: { type: Number, required: true },
    manager: { type: String, required: true },
    joueurs: [{ type: Schema.Types.ObjectId, ref: 'Joueur' }]
});

const EquipeModel = mongoose.model<IEquipe>('Equipe', equipeSchema);

export default EquipeModel;
