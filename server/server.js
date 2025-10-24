import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.config.js';
import userRouter from './Routes/user.Routes.js';
import resumeRouter from './Routes/Resume.routes.js';
import aiRouter from './Routes/aiRouter.js';


const app = express();
const PORT = process.env.PORT || 3000;


// Database Connection
    await connectDB();

app.use(express.json())
app.use(cors())



app.get('/', (req, res)=>res.send("server is live..."))
app.use('/api/users', userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});