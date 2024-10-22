import mongoose, { Document, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IUser extends Document {
  _id: string
  username: string
  email: string
  password: string
  role: 'guest' | 'user'
}

const userSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['guest', 'user'],
      default: 'user', // Default role
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<IUser>('User', userSchema)
export default User
