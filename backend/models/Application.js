import mongoose from "mongoose";
const {Schema} = mongoose;

const applicaitonSchema = new Schema({
    job:{
        type:Schema.Types.ObjectId,
        ref:"Jobs",
    },
    applicant:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending',
    },
},{timestamps:true});

export const Application = mongoose.model("Application",applicaitonSchema);