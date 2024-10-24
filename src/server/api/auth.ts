import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import User, { IUser } from '../models/User'

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

// // Registration route
// router.post(
//   '/register',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { username, email, password } = req.body
//     const existingUser = await User.findOne({ email })

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)
//     const newUser: IUser = new User({
//       _id: uuidv4(),
//       username,
//       email,
//       password: hashedPassword,
//       role: 'user', // Set role for registered user
//     })

//     await newUser.save()
//     res.status(201).json({ message: 'User registered successfully' })
//   })
// )

// // Login route
// router.post(
//   '/login',
//   asyncHandler(async (req: Request, res: Response) => {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' })
//     }

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' })
//     }

//     const jwtSecret = process.env.JWT_SECRET
//     if (!jwtSecret) {
//       return res.status(500).json({ message: 'JWT secret not configured' })
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role }, // Include role in token payload
//       jwtSecret,
//       { expiresIn: '1h' }
//     )

//     res.json({ token, message: 'Login successful!' })
//   })
// )

// Guest login route
router.post(
  '/guest',
  asyncHandler(async (req: Request, res: Response) => {
    const guestUserId = uuidv4() // Generate a random ID for guest
    const timestamp = Date.now().toString()
    const guestUsername = `Guest_${timestamp}`

    const newGuest: IUser = new User({
      _id: guestUserId,
      username: guestUsername,
      email: `${guestUserId}@guest.com`, // Dummy email for guests
      role: 'guest',
    })

    await newGuest.save() // Save guest to database

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret not configured' })
    }

    const guestToken = jwt.sign(
      { id: newGuest._id, role: newGuest.role }, // Include guest role in token payload
      jwtSecret,
      { expiresIn: '1h' }
    )

    res.json({
      token: guestToken,
      message: 'You are now playing as a guest!',
    })
  })
)

export default router
