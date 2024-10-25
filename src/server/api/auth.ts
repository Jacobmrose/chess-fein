import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import GuestUser, { IGuestUser } from '@/server/models/Guest'

dotenv.config() // Load environment variables

const router = express.Router()

// Helper function to handle async routes
const asyncHandler = (fn: (req: Request, res: Response) => Promise<any>) => {
  return (req: Request, res: Response) => {
    return Promise.resolve(fn(req, res)).catch((err) => {
      console.error('Error handling request:', err)
      res.status(500).json({ message: 'Internal server error' })
    })
  }
}

// Guest login route
router.post(
  '/guest',
  asyncHandler(async (req: Request, res: Response) => {
    const guestUserId = uuidv4() // Generate a random ID for guest
    const timestamp = Date.now().toString()
    const guestUsername = `Guest_${timestamp}`

    // Create new guest user
    const newGuest: IGuestUser = new GuestUser({
      _id: guestUserId,
      username: guestUsername,
      role: 'guest',
    })

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret not configured' })
    }

    const guestToken = jwt.sign(
      { id: newGuest._id, role: newGuest.role }, // Include guest role in token payload
      jwtSecret,
      { expiresIn: '1h' }
    )

    // Save guest user along with the generated token
    newGuest.token = guestToken // Store the token in the guest user document
    await newGuest.save() // Save guest user with the token to the database

    res.json({
      token: guestToken,
      message: 'You are now playing as a guest!',
    })
  })
)

export default router
