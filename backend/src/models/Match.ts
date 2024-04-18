import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
    equipeA: mongoose.Types.ObjectId;
    equipeB: mongoose.Types.ObjectId;
    scoreA: number;
    scoreB: number;
    dateDuMatch: Date;
}

const matchSchema = new Schema({
    equipeA: { type: Schema.Types.ObjectId, ref: 'Equipe', required: true },
    equipeB: { type: Schema.Types.ObjectId, ref: 'Equipe', required: true },
    scoreA: { type: Number, required: true },
    scoreB: { type: Number, required: true },
    dateDuMatch: { type: Date, required: true }
});

const MatchModel = mongoose.model<IMatch>('Match', matchSchema);

export default MatchModel;