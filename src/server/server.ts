// src/server/server.ts

import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './api/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const uri: string = process.env.DB_CSTRING || ''

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB with Mongoose'))
  .catch((err) => console.error('Error connecting to MongoDB', err))

// Use the authentication routes
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
