import mongoose, { Schema, Document } from 'mongoose';
import { IUtilisateur } from "./User";

export interface IEquipe extends Document {
    nom: string;
    budget: number;
    manager: IUtilisateur;
    joueurs: string[];
    formation: Array<{ joueurId: string, position: string }>;
    tactiques: string;
}

const equipeSchema = new Schema({
    nom: { type: String, required: true },
    budget: { type: Number, required: true },
    manager: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    joueurs: [{ type: Schema.Types.ObjectId, ref: 'Joueur' }],
    formation: [{
        joueurId: { type: Schema.Types.ObjectId, ref: 'Joueur' },
        position: { type: String }  // Exemples: "Gardien", "Défenseur central", etc.
    }],
    tactiques: {
        type: String,
        enum: ['Pressing Haut', 'Jeu Large', 'Contre-Attaque', 'Possession'],
        default: 'Pressing Haut'
    }
});

const EquipeModel = mongoose.model<IEquipe>('Equipe', equipeSchema);

export default EquipeModel;