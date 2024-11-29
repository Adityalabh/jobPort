import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectionDb } from "./utils/db.js";
import userRoutes from "./router/userRoutes.js";
import companyRoutes from "./router/companyRoutes.js";
import jobsRoutes from "./router/jobsRoutes.js";
import applicationRoutes from './router/applicationRoutes.js';
import path from "path";

const app = express();
const __dirname = path.resolve();
dotenv.config();

console.log(__dirname);
console.log("MongoDB URL:", process.env.PORT);
app.use(cookieParser());
app.use(cors({
    origin:process.env.URL,
    credentials:true
}));

app.use(express.json());
app.use("/user",userRoutes);
app.use('/company',companyRoutes);
app.use('/job',jobsRoutes);
app.use('/application',applicationRoutes);
app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})
const port = process.env.PORT ;
app.get('/test',(req,res)=>{
    res.json("server running");
})
console.log(process.env.CLOUD_NAME);
app.listen(port ,()=>{
    connectionDb();
    console.log(`server Listening on port ${port}`);
});