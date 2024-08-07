import express from 'express';
import userAuth from '../middlewares/authMiddlewares.js';
import createJobController, { deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js';

const router = express.Router();

//routes
//Create job ||post

router.post('/create-job', userAuth, createJobController);

//GET jobs ||Get
router.get('/get-job', userAuth, getAllJobsController);

//Update jobs ||put ||patch
router.patch("/update-jobs/:id", userAuth, updateJobController);

//Delete jobs ||delete
router.delete("/delete-job/:id", userAuth, deleteJobController);

//Jobs stats filter||get
router.get("/job-stats", userAuth, jobStatsController);

export default router;