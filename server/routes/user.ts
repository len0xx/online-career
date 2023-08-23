import { Router } from "express"
import { createNewUser } from '../controllers/user.js'

const userRouter = Router()

userRouter.post('/', createNewUser)

export { userRouter }
