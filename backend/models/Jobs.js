import mongoose from "mongoose";
const { Schema } = mongoose;


// created by recruiter
const jobsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    requirements: [{
        type: String,
    }],
    salary: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    },
    description: { type: String, required: true },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    YrExperience:{
        type:Number,
        required:true,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: "Application",
    }],

}, { timestamps: true });

export const Jobs = mongoose.model("Jobs", jobsSchema);