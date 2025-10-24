import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import Resume from "../models/Resume.model.js"

// 4)creating a jwt token function after successfully creating a new user to send it 

const generatetoken = (userId)=>{
        const token = jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: '10d'})
        return token;
}


// 1)Creating a controller for user registeration
// POST: /api/users/register
export const registerUser = async (req,res) =>{
    try{
        const {name, email,password} = req.body;

        // check if required fields are present
        if(!name || !email || !password){
            return res.status(400).json({message :"Missing required fields"})
        }

        // 2)check if user already exists
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        // 3)creating a new user

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,email,password:hashedPassword
        })

        // 5) return success message
        const token = generatetoken(newUser._id)
        newUser.password = undefined;

        return res.status(201).json({message:"User created successfully",token,user:newUser})

    }catch(error){
            return res.status(400).json({message:error.message})
    }
}




// Controller for User Login
// POST:/api/users/login

export const loginUser = async (req,res) =>{
    try{
        const { email,password} = req.body;

        

        // 2)check if user  exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Email or password"})
        }

        // check if password is correct 
        if(!user.comparePassword(password)){
            return res.status(400).json({message:"Invalid Email or password"})
        }

        // 5) return success message
        const token = generatetoken(user._id)
        user.password = undefined;

        return res.status(201).json({message:"Login successfully",token,user})

    }catch(error){
            return res.status(400).json({message:error.message})
    }
}


// controller for getting user by its userId
// GET: /api/users/data

export const getUserById = async(req, res) => {
    try{
            const userId = req.userId;

            // check if user exist with these userId
            const user = await User.findById(userId)
            if(!user){
                res.status(404).json({message: 'User not found'})
            }
            user.password = undefined
            return res.status(200).json({user})
    }catch(error){
            return res.status(400).json({message:error.message})
    }
}



// Controller for getting user resumes
//  GET: api/users/resumes

export const getUserResumes = async (req,res) =>{
    try{
            const userId = req.userId;

            // return user resumes 
            const resumes = await Resume.find({userId})
            return res.status(200).json({resumes})
    }catch(error){
            return res.status(400).json({message:error.message})
    }
}