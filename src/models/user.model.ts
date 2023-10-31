import mongoose, {Document} from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    username: string;
    password: string;
    validatePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.validatePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export {User, IUser};
