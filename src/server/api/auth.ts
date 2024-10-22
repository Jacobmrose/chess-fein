import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import User, { IUser } from '../models/User'

dotenv.config() // Load environment variables

const app = express()
app.use(express.json())

mongoose
  .connect(process.env.DB_CSTRING as string)
  .catch((err) => console.error(`Initial connection error: ${err}`))

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB ChessFein database!')
})

const router = express.Router()

// Registration route
router.post('/register', (req: express.Request, res: express.Response) => {
  ;(async () => {
    const { username, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: IUser = new User({
      _id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      role: 'user', // Set role for registered user
    })
    try {
      await newUser.save()
      res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
      console.error('Error registering user:', error)
      res.status(500).json({ message: 'Error registering user' })
    }
  })()
})

// Login route
router.post('/login', (req: express.Request, res: express.Response) => {
  ;(async () => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in token payload
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    )
    res.json({ token, message: 'Login successful!' })
  })()
})

// Guest Login route
router.post('/guest', (req: express.Request, res: express.Response) => {
  const guestUserId = uuidv4() // Generate a random ID for guest
  const guestToken = jwt.sign(
    { id: guestUserId, role: 'guest' }, // Include guest role in token payload
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  )
  res.json({ token: guestToken, message: 'You are now playing as a guest!' })
})

export default router
