import express from "express";
import { isAuthenticate } from "../middelware/auth.js";
import { applyApplicant, getApplicants, getAppliedjob, updateStatus } from "../controllers/applicantsCtrl.js";
const router = express.Router();

router.route('/apply/:id').post(isAuthenticate, applyApplicant);
router.route('/getApplieJobs').get(isAuthenticate, getAppliedjob);
router.route('/getApplicants/:id').get(isAuthenticate, getApplicants);
router.route('/status/:id/update').post(isAuthenticate, updateStatus);

export default router;  