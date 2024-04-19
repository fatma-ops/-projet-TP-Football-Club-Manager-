import mongoose, { Schema, Document } from 'mongoose';
import { IUtilisateur } from "./User";

export interface IEquipe extends Document {
    nom: string;
    budget: number;
    manager: IUtilisateur;
    joueurs: string[];
}

const equipeSchema = new Schema({
    nom: { type: String, required: true },
    budget: { type: Number, required: true },
    manager: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Référence au modèle User
    joueurs: [{ type: Schema.Types.ObjectId, ref: 'Joueur' }]
});

const EquipeModel = mongoose.model<IEquipe>('Equipe', equipeSchema);

export default EquipeModel;
