import { Jobs } from "../models/Jobs.js";

export const createJob = async (req, res) => {
    try {
        const { title, jobType, requirements, salary, location,
            position, description, YrExperience, companyId } = req.body;

        const userId = req.id;
        // console.log(userId);
        const job = await Jobs.create({
            title, jobType, requirements: requirements.split(","), salary: salary, location,
            position, description, YrExperience: Number(YrExperience), company: companyId, created_by: userId
        });
        return res.status(200).json({ message: 'job created', job });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getAllJob = async (req, res) => {

    // try {
    //     const keyword = req.query.keyword || " ";
    //     const query = {
    //         $or: [
    //             { title: { $regex: keyword, $options: "i" } },
    //             { description: { $regex: keyword, $options: "i" } },
    //         ]
    //     };
    //     const jobs = await Jobs.find(query);
    //     if (!jobs) {
    //         return res.json('jobs not found');
    //     }
    //     return res.json(jobs);
    // } catch (error) {
    //     res.json(error.message);
    // }

    try {
        const alljobs = await Jobs.find()
            .populate({ path: "company" })
            .populate({ path: "applications" })
            .sort({ createdAt: -1 });
        if (!alljobs) {
            res.json('jobs not found');
        }
        res.json(alljobs);
    } catch (error) {
        res.json(error);
    }

    // try {
    //     const keyword = req.query.keyword || "";
    //     const query = {
    //         $or: [
    //             { title: { $regex: keyword, $options: "i" } },
    //             { description: { $regex: keyword, $options: "i" } },
    //         ]
    //     };
    //     const jobs = await Jobs.find(query).populate({
    //         path: "company"
    //     }).sort({ createdAt: -1 });
    //     if (!jobs) {
    //         return res.status(404).json({
    //             message: "Jobs not found.",
    //             success: false
    //         })
    //     };
    //     return res.status(200).json({
    //         jobs,
    //         success: true
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
}

// export const getAllAdminJob = async (req, res) => {
//     const userId = req.id;
//     try {
//         const alljobs = await Jobs.find({ created_by: userId })
//             .populate({ path: "company" })
//             .populate({ path: "applications" })
//             .sort({ createdAt: -1 });
//         if (!alljobs) {
//             res.json('jobs not found');
//         }
//         res.json(alljobs);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Jobs.findById(jobId)
            .populate({ path: "applications" })
            .populate({ path: "company" });
        if (!job) {
            return res.json("job not found");
        }
        return res.json(job);
    } catch (error) {
        res.json(error.message);
    }

}

export const getAdminJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobs = await Jobs.find({ created_by: userId })
            .populate({ path: "company" })
            .populate({ path: "applications" }).sort({ createdAt: -1 });
        if (!jobs) {
            res.json('job not found');

        }
        return res.json(jobs);
    } catch (error) {
        return res.json(error.message);
    }

}

export const EditJob = async (req, res) => {
    try {
        const {title,jobType,requirements,salary,location,position,description,YrExperience } =req.body;
        const {MycompanyId} = req.body;
        const jobId = req.params.id;
        // console.log(MycompanyId);
        const userId = req.id;
        const myJob = await Jobs.findById(jobId);
        // console.log(myJob);
        if(!myJob){
            res.status(404).json('job not found');
        }
         myJob.set({title,jobType,requirements,salary,location,position,description,company:MycompanyId,YrExperience,created_by:userId });
         const editedJob = await myJob.save();
        res.status(200).json({message:"job edited successfully ",editedJob});
    } catch (error) {
        res.status(500).json(error.message);
    }
}