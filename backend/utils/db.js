import mongoose from "mongoose";
export const  connectionDb = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("mongoose database connected");
    } catch (error) {
        console.log(error.message);
    }
}
