import { Schema, model, ObjectId } from 'mongoose';

interface dataChat {
  idUser1: string;
  idUser2: string;
  data: string;
  _id?: ObjectId;
  isDelete: boolean;
}

//Create schema
const chatSchema = new Schema<dataChat>(
  {
    idUser1: { type: String, required: true },
    idUser2: { type: String, required: true },
    data: { type: String, required: true },
    isDelete: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

const User = model<dataChat>('User', chatSchema);

export default User;
