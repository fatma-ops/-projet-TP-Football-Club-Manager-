import {IEquipe} from "./Equipe";
import mongoose, {Schema, Document} from "mongoose";

export interface IUtilisateur extends Document {
    id: string
    nom: string;
    email: string;
    motDePasse: string;
    role: string;
    club: IEquipe;
}

const userSchema = new Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    motDePasse: { type: String, required: true },
    role: { type: String, required: true },
    club: { type: Schema.Types.ObjectId, ref: 'Equipe' }
});

const UserModel = mongoose.model<IUtilisateur>('User', userSchema);

export default UserModel;
