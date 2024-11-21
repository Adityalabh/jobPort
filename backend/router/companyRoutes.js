import express from "express";
import { companyRegister, editCompany, getCompany, getCompanyById } from "../controllers/companyCtrl.js";
import { isAuthenticate } from "../middelware/auth.js";
import upload from "../middelware/multer.js";

const router = express.Router();

router.route('/register').post(isAuthenticate,upload ,companyRegister);
router.route('/profile').get(isAuthenticate ,getCompany);
router.route('/profile/:id').get(isAuthenticate ,getCompanyById);
router.route('/edit/:id').put(isAuthenticate,upload ,editCompany);

export default router;