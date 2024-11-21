import express  from "express";
import { isAuthenticate } from "../middelware/auth.js";
import { createJob, EditJob, getAdminJob, getAllJob, getJobById } from "../controllers/jobsCtr.js";
const router  = express.Router();

router.route('/create').post(isAuthenticate,createJob);
router.route('/getallJobs').get(getAllJob);
router.route('/getjobById/:id').get(isAuthenticate,getJobById);
router.route('/getAdminJobs').get(isAuthenticate,getAdminJob);
router.route('/jobEdit/:id').put(isAuthenticate,EditJob);
export default router;