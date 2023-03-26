import { Schema, model, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

interface dataUser {
  email: string;
  password: string;
  _id?: ObjectId;
  name: string;
  isAdmin: boolean;
}

//Create schema
const userSchema = new Schema<dataUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  return user;
};

const User = model<dataUser>('User', userSchema);

export default User;
