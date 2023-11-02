import mongoose, { Schema, Document } from 'mongoose';

// The Skin model is a master list of skins that are available for purchase
// The UserSkin model is a list of skins that a user has purchased, and can be customized

interface IUserSkin extends Document {
    user: mongoose.Types.ObjectId;
    skin: mongoose.Types.ObjectId;
    color: string; // The customized color of the skin
}

const userSkinSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    skin: { type: Schema.Types.ObjectId, ref: 'Skin', required: true },
    color: { type: String, required: true }
});

const UserSkin = mongoose.model<IUserSkin>('UserSkin', userSkinSchema);

export { UserSkin, IUserSkin };