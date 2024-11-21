import express  from "express";
import { currUser, editUser, login, logOut, setUserSavedJobs, userProfile, userRegister } from "../controllers/userCtrl.js";
import { isAuthenticate } from "../middelware/auth.js";
import upload from "../middelware/multer.js";
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(login);
router.route('/edit').put(isAuthenticate,upload,editUser);
router.route('/logout').post(isAuthenticate,logOut);
router.route('/profile/:id').get(isAuthenticate,userProfile);
router.route('/savejob/:id').patch(isAuthenticate,setUserSavedJobs);
router.route('/currUser').get(isAuthenticate,currUser);

export default router;