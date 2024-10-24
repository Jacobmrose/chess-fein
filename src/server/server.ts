import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import router from './api/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const uri: string = process.env.DB_CSTRING || ''

// Middleware
app.use(cors())
app.use(helmet()) // Add Helmet for security
app.use(express.json())

// Rate limiter to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api/auth', limiter) // Apply rate limiter only to auth routes

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB with Mongoose'))
  .catch((err) => console.error('Error connecting to MongoDB', err))

// Use the authentication routes
app.use('/api/auth', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
