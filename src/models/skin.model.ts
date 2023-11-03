import mongoose, { Document } from 'mongoose';

interface ISkin extends Document {
    id: number;
    name: string;
    types: string[];
    price: number;
    color: string;
}

const skinSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    types: { type: [String], required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true }
});

const SkinModel = mongoose.model<ISkin>('Skin', skinSchema);

export { SkinModel, ISkin };
