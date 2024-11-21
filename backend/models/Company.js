import mongoose from "mongoose";
const {Schema} = mongoose;

const companySchema = new Schema({
    companyName:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    website:{
        type:String,
        default:null,
    },
    logo:{
        type:String,
        default:"https://png.pngtree.com/element_our/png/20181228/building-vector-icon-png_296032.jpg"
    },
    location:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
},{ timestamps: true });

export const Company = mongoose.model('Company',companySchema);
