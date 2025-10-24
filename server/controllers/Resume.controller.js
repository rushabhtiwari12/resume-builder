import Resume from "../models/Resume.model.js"
import fs from "fs"
import FileSystem from "fs"
import imagekit from "../config/imagekit.config.js"



// Controller for creating a new Resume
// POST: /api/resume/create
export const createResume = async(req, res) =>{
try{
    const userId = req.userId
    const {title} = req.body

    // Creating a new resume
    const newResume = await Resume.create({userId, title})

    // Return succes message
    return res.status(201).json({message:'Resume created successfully', resume:newResume})
    }catch(error){
            return res.status(400).json({message: error.message})
    }

}

// Controller for deleting a new Resume
// POST: /api/resume/delete
export const deleteResume = async(req, res) =>{
    try{
    const userId = req.userId
    const {resumeId} = req.params

    // Creating a new resume
    const newResume = await Resume.findByIdAndDelete({userId, _id:resumeId})

    // Return succes message
    return res.status(201).json({message:'Resume Deleted successfully', resume:newResume})
    }catch(error){
            return res.status(400).json({message: error.message})
    }

}

// Get user resume by id
// GET: api/resumes/get
export const getResumeById = async(req, res) =>{
    try{
    const userId = req.userId
    const {resumeId} = req.params

    // Creating a new resume
    const resume = await Resume.findOne({userId, _id:resumeId})
    if(!resume){
        return res.status(404).json({message: 'Resume not found'})
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined

    // Return succes message
    return res.status(201).json({resume})
    }catch(error){
            return res.status(400).json({message: error.message})
    }

}


// get resume by id public
// GET: /api/resume/public


export const getPublicResumeById = async(req, res) =>{
    try{
    const {resumeId} = req.params

    // Creating a new resume
    const resume = await Resume.findOne({public:true , _id:resumeId})
    if(!resume){
        return res.status(404).json({message: 'Resume not found'})
    }

    // Return succes message
    return res.status(200).json({resume})
    }catch(error){
            return res.status(400).json({message: error.message})
    }

}


// Controller for updating a resume
// PUT: api/resumes/update
export const updateResume = async(req, res) =>{
    try{
    const {resumeId, resumeData, removeBackground} = req.body
    const userId = req.userId
    const image = req.file; 

    let resumeDataCopy = JSON.parse(resumeData);

        if(image){
            const imageBufferData = FileSystem.createReadStream(image.path)

            const response = await imagekit.files.upload({
                file:imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation:{
                    pre: 'w-300,h-300, fo-face,z-0.75'+(removeBackground ? ',e-bgremove':'')
                }
            });
            resumeDataCopy.personal_info.image = response.url
        }

    // Creating a new resume
    const resume = await Resume.findByIdAndUpdate({userId, _id:resumeId}, resumeDataCopy, {new:true})

    // Return succes message
    return res.status(200).json({message: "Saved Successfully",resume})
    }catch(error){
            return res.status(400).json({message: error.message})
    }

}


