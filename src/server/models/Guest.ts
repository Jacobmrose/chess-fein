// models/User.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface IGuestUser extends Document {
  _id: string // Unique identifier for the guest
  username: string // Guest username
  role: string // Role (should be 'guest')
  token?: string // Optional field to store JWT token
}

const guestUserSchema = new Schema<IGuestUser>({
  _id: { type: String, required: true }, // Ensure the _id is a string (UUID)
  username: { type: String, required: true }, // Guest username must be provided
  role: { type: String, required: true, default: 'guest' }, // Default role set to 'guest'
  token: { type: String }, // Optional field to store JWT token
})

// Create the model for guest users
const GuestUser = mongoose.model<IGuestUser>('GuestUser', guestUserSchema)

export default GuestUser
