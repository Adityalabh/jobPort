import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ["seeker", "recruiter"],
        required: true,
    },

    profile: {
        bio: { type: String,default:null },
        skills: [{ type: String,default:null }],
        resume: { type: String,default:null },
        resumeOriginalName: { type: String,default:null },
        company: { type: Schema.Types.ObjectId, ref: "Company",default:null },
        bannerImg: { type: String, default: "https://www.shutterstock.com/image-photo/flaylay-laptop-stationery-on-blue-260nw-1736989202.jpg" },
        profileImg: {
            type: String,
            default: "https://img.freepik.com/premium-vector/illustrations_995281-35700.jpg?w=360",
        },
        savedJobs:[{type:Schema.Types.ObjectId,ref:"Jobs",default:[]}],
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
