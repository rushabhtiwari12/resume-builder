import express from 'express';
import protect from "../middlewares/auth.middleware.js"
import { enhanceJobDescription, enhanceProfessionalSummary } from '../controllers/ai.controller.js';
import { updateResume } from '../controllers/Resume.controller.js';

const aiRouter = express.Router();


aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription)
aiRouter.post('/upload-resume', protect, updateResume)

export default aiRouter