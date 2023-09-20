import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './db.js'
import { userRouter } from './routes/user.js'

dotenv.config()
const { NODE_ENV, APP_PORT, APP_IP } = process.env

connectDB()

const app = express()
app.disable('x-powered-by')

// Поддержка Cookie и стандартных способов отправки форм
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (NODE_ENV === 'development') {
    app.use(cors())
}

app.use('/api/user', userRouter)

app.listen(APP_PORT ? +APP_PORT : 4000, APP_IP ?? 'localhost', () =>
    console.log(`The server is up and running at http://${APP_IP}:${APP_PORT}`)
)
