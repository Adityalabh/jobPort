import { Company } from "../models/Company.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sharp from "sharp";
import cloudinary from "../utils/Cloudinary.js";

dotenv.config();
function getLoggedIdByReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })
}

export const companyRegister = async (req, res) => {
    try {
        const { companyName, description, location } = req.body;
        const logo = req.files.logo?.[0];
        const registeredCompany = await Company.findOne({ companyName });
        if (registeredCompany) {
            return res.json({ message: "company already registered" });
        }
        // console.log("logo", logo);
        let cloudLogoRes;
        if (logo) {
            let optimizeImg = await sharp(logo.buffer)
                .resize({ width: 800, height: 450, fit: "contain" })
                .toFormat("jpeg", { quality: 80 })
                .toBuffer();

            let logoUri = `data:image/jpeg;base64,${optimizeImg.toString('base64')}`;
            cloudLogoRes = await cloudinary.uploader.upload(logoUri);
        }
        const newCompany = await Company.create({
            companyName, userId: req.id, description, location,
            ...(cloudLogoRes && { logo: cloudLogoRes.secure_url })

        });
        return res.status(201).json({ message: "company created successfully", newCompany });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getCompany = async (req, res) => {
    try {
        const { id } = await getLoggedIdByReq(req);
        const myCompany = await Company.find({ userId: id });   
        // console.log(id,myCompany);
        if (!myCompany) {
            return res.json('company not found');
        }
        res.json(myCompany);
    } catch (error) {
        res.json(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            res.json('company not found');
        }
        return res.json(company);
    } catch (error) {
        res.json(error.message);
    }
}

export const editCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { companyName, description, website, location } = req.body;

        const logo = req.files?.logo?.[0];
        let cloudLogoRes;
        if (logo) {
            let optimizeImg = await sharp(logo.buffer)
                .resize({ width: 800, height: 400, fit: "contain" })
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            let datauri = `data:image/jpeg;base64,${optimizeImg.toString('base64')}`;
            cloudLogoRes = await cloudinary.uploader.upload(datauri);
        }
        const updatedData = {
            companyName, description, website, location, ...(cloudLogoRes && { logo: cloudLogoRes.secure_url })
        };
        const company = await Company.findByIdAndUpdate(companyId,  updatedData, { new: true });
        if (!company) {
            return res.status(404).json("company not found");
        }
        return res.json({ message: "company edited succesfully", company });
    } catch (error) {
        res.status(500).json(error.message);
    }
}