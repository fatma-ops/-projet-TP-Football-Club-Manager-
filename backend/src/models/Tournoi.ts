import mongoose, { Schema, Document } from 'mongoose';
import { IMatch } from "./Match";

export interface ITournoi extends Document {
    nomDuTournoi: string;
    reglement: string;
    equipesParticipantes: mongoose.Types.ObjectId[];
    matchs: IMatch[];
}

const tournoiSchema = new Schema({
    nomDuTournoi: { type: String, required: true },
    reglement: { type: String, required: true },
    equipesParticipantes: [{ type: Schema.Types.ObjectId, ref: 'Equipe', required: true }],
    matchs: [{ type: Schema.Types.ObjectId, ref: 'Match' }]
});

const TournoiModel = mongoose.model<ITournoi>('Tournoi', tournoiSchema);

export default TournoiModel;