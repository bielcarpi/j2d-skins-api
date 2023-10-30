import mongoose, { Document } from 'mongoose';

interface ISkin extends Document {
    name: string;
    types: string[];
    price: number;
    color: string;
}

const skinSchema = new mongoose.Schema({
    name: { type: String, required: true },
    types: { type: [String], required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true }
});

const Skin = mongoose.model<ISkin>('Skin', skinSchema);

export { Skin, ISkin };
