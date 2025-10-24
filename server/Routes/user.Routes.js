import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/User.controller.js";
import express from 'express'
import protect from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/data',protect, getUserById)
userRouter.get('/resumes', protect, getUserResumes)

export default userRouter