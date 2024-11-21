import { Application } from "../models/Application.js";
import { Jobs } from "../models/Jobs.js";

export const applyApplicant = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.json('job Id is not available');
        }
        const existingUser = await Application.findOne({ job: jobId, applicant: userId });

        if (existingUser) {
            return res.json('already applied for this job');
        }

        // checking is job present
        const job = await Jobs.findById(jobId);

        if (!job) {
            return res.json("job not available");
        }

        const newApplicant = await Application.create({
            applicant: userId, job: jobId
        });

        // after applying for job no push this application array in job 
        job.applications.push(newApplicant);
        await job.save();
        return res.json({ messaage: "job applied successfully", newApplicant });

    } catch (error) {
        return res.json(error.message);
    }

}

// for job seeker
export const getAppliedjob = async (req, res) => {
    try {
        const userId = req.id;
        const appliedJobs = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job", options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { creataedAt: -1 } },
                }
            });
        if (!appliedJobs) {
            return res.json("no applied jobs are found");
        }
        return res.json(appliedJobs);

    } catch (error) {
        return res.json(error.messaage);
    }
}

// for job creator
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Jobs.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: "applicant"
            }
        });
        if (!job) {
            return res.json('no applicants found');
        }
        return res.json(job);
    } catch (error) {
        return res.json(error.messaage);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        // console.log(status);
        const applicationId = req.params.id;
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(400).json('something is wrong');
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(201).json({message:'status updated successefully',application});
    } catch (error) {
        return res.status(500).json(error.messaage);
    }
}