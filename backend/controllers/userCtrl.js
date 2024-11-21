import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sharp from "sharp";
import cloudinary from "../utils/Cloudinary.js";
import getDataUri from "../utils/dataUri.js";

dotenv.config();
const jwtSecret = process.env.jwtSecret;
const bcryptSalt = bcryptjs.genSaltSync(10);

function getLoggedIdByReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })
}
// console.log(jwtSecret);
export const userRegister = async (req, res) => {
    try {
        const { userName, email, role, phoneNumber, password } = req.body;
        // const profileImg = req.files?.profileImg[0];    
        if (!userName || !email || !password || !phoneNumber) {
            return res.status(400).json("All fields are required");
        }
        const registeredUser = await User.findOne({ email });
        if (registeredUser) {
            return res.status(409).json("user already registered");
        }
        const newUser = await User.create({
            userName, email, role, phoneNumber,
            password: bcryptjs.hashSync(password, bcryptSalt)
        });
        const { password: _, ...userDoc } = newUser.toObject();
        return res.json(userDoc);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.json('something is missing');
        }
        const registeredUser = await User.findOne({ email });
        if (!registeredUser) {
            return res.status(404).json("user not found");
        }
        if (role !== registeredUser.role) {
            return res.status(404).json("account doesn't exist with current role");
        }
        const passOk = bcryptjs.compareSync(password, registeredUser.password);
        if (!passOk) {
            return res.status(401).json("Incorrect password");
        }
        jwt.sign({ id: registeredUser._id, userName: registeredUser.userName }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            const { password: _, ...userWithoutPassword } = registeredUser.toObject();
            return res.cookie("token", token, { httpOnly: true }).json(userWithoutPassword);
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

export const logOut = (req, res) => {
    try {
        return res.clearCookie("token", "").json("user Logged Out");
    } catch (error) {
        return res.json(error.message);
    }
}

export const userProfile = async (req, res) => {
    try {
        const loggedUserId = req.params.id;
        const userData = await User.findById(loggedUserId).populate({ path: 'profile.savedJobs',
            populate:{
                path:"company"
            }
         });
        if (!userData) {
            // console.log("loggedUserId", loggedUserId);
            return res.status(404).json("user not found on Id", loggedUserId);
        }
        res.json(userData);
    } catch (error) {
        res.json(error.message);
    }
}

export const currUser = async (req, res) => {
    try {
        const user = await getLoggedIdByReq(req);
        const currUser = await User.findById(user.id)
        // .populate({ path: 'profile.savedJobs' })
        .populate({ path: "profile.savedJobs",
            populate:{
                path:"company",
            }
         });
        if (!currUser) {
            return res.status(404).json('not found');
        }
        res.json(currUser);
    } catch (error) {
        res.json(error);
    }
}

export const editUser = async (req, res) => {
    try {
        // console.log("files", req.files);
        const { userName, email, phoneNumber, skills, bio } = req.body;
        const bannerImg = req.files.bannerImg ? req.files.bannerImg[0] : null;
        const profileImg = req.files.profileImg?.[0];
        const resume = req.files.resume?.[0];

        const loggedUser = await getLoggedIdByReq(req);
        const currUser = await User.findById(loggedUser.id);
        if (!currUser) {
            res.status(404).json("user not found");
        }
        let cloudBannerRes;
        let cloudProfileRes;
        let cloudResumeRes;
        // console.log('bannerImg', bannerImg, userName);
        if (bannerImg) {
            const optimizeImg = await sharp(bannerImg.buffer)
                .resize({ width: 800, height: 450, fit: "contain" })
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();
            const bannerUri = `data:image/jpeg;base64,${optimizeImg.toString('base64')}`;
            cloudBannerRes = await cloudinary.uploader.upload(bannerUri);

        }
        if (profileImg) {
            const optimizImg = await sharp(profileImg.buffer)
                .resize({ width: 800, height: 450, fit: "cover" })
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();
            const profileUri = `data:image/jpeg;base64,${optimizImg.toString('base64')}`;
            cloudProfileRes = await cloudinary.uploader.upload(profileUri);
        }
        if (resume) {
            const resumeUri = getDataUri(resume);
            cloudResumeRes = await cloudinary.uploader.upload(resumeUri.content);
            // console.log(resumeUri);
        }
        // console.log(cloudBannerRes);

        if (loggedUser.id === currUser._id.toString()) {
            currUser.set({
                // also inserting nested data
                //here if skill present then inserted it otherwise insert the original skill in it
                userName, email, phoneNumber, 'profile.bio': bio, 'profile.skills': Array.isArray(skills) ? skills : skills.split(","),
                ...(cloudBannerRes && { 'profile.bannerImg': cloudBannerRes.secure_url }),
                ...(cloudProfileRes && { 'profile.profileImg': cloudProfileRes.secure_url }),
                ...(cloudResumeRes && { 'profile.resume': cloudResumeRes.secure_url, 'profile.resumeOriginalName': resume.originalname }),
            });
        }
        await currUser.save();
        return res.json({ currUser, message: 'user edited successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const setUserSavedJobs = async (req, res) => {
    try {
        const userId = await getLoggedIdByReq(req);
        const jobId = req.params.id;
        const currUser = await User.findById(userId.id);
        if (!currUser) {
            return res.status(404).json('user not found');
        }
        if (!currUser.profile.savedJobs.includes(jobId)) {
            currUser.profile.savedJobs.push(jobId);
            currUser.save();
            return res.status(200).json({ message: 'job saved successfully' });
        }
        return res.status(200).json({ message: 'job already saved' });
    } catch (error) {
        req.status(500).json(error);
    }
}