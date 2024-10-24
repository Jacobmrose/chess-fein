import mongoose, { Document, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IUser extends Document {
  _id: string
  username: string
  email: string
  password: string
  role: 'guest' | 'user'
  createdAt: Date
}

const userSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: function (this: IUser) {
        return this.role === 'user'
      }, // Email required only for users
      unique: function (this: IUser) {
        return this.role === 'user'
      },
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.role === 'user'
      }, // Password required only for users
    },
    role: {
      type: String,
      enum: ['guest', 'user'],
      default: 'user',
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

// TTL index is only applied to guests
userSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 3600, partialFilterExpression: { role: 'guest' } }
)

const User = mongoose.model<IUser>('User', userSchema)
export default User
