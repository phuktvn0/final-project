import { Schema, model, ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';

interface dataUser {
  email: string;
  password: string;
  _id?: ObjectId;
  name: string;
  phone: string;
  address: string;
  province: string;
  isDelete: boolean;
}

//Create schema
const userSchema = new Schema<dataUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    province: { type: String, required: true },
    isDelete: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  delete user.isDelete;
  return user;
};

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'phu';
// userSchema.methods.generateToken = async function () {
//   const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY);
//   return accessToken;
// };

const User = model<dataUser>('User', userSchema);

export default User;
