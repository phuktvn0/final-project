import mongoose, { Schema, model, ObjectId } from 'mongoose';

interface dataPost {
  title: string;
  description: string;
  type: string;
  url: Array<string>;
  price: number;
  idUser: ObjectId;
}

//Create schema
const postSchema = new Schema<dataPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: [String], required: true },
    price: { type: Number, required: true },
    idUser: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Post = model<dataPost>('Post', postSchema);

export default Post;
