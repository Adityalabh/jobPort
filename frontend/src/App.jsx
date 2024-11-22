import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import axios from "axios";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Jobs from "./Pages/Jobs";
import BrowseJob from "./Pages/BrowseJob";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import JobProfile from "./Pages/JobProfile";
import LandingPage from "./Pages/RecruiterSide/LandingPage";
import CompnayCreate from "./Pages/RecruiterSide/CompnayCreate";
import EditCompany from "./Pages/RecruiterSide/EditCompany";
import CreatedJobs from "./Pages/RecruiterSide/CreatedJobs";
import CreatJob from "./Pages/RecruiterSide/CreatJob";
import EditJob from "./Pages/RecruiterSide/EditJob";
import Applicants from "./Pages/RecruiterSide/Applicants";
import ProtectedRoute from "./Pages/RecruiterSide/ProtectedRoute";
import SavedJobs from "./Pages/SavedJobs";
// import dotenv from"dotenv";

// dotenv.config();
axios.defaults.baseURL = "https://jobport-1-neds.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/browse" element={<BrowseJob/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="savedJobs" element={<SavedJobs/>}/>

          {/* Admin ke liye */}
          <Route path="/admin/company" element={<ProtectedRoute><LandingPage/></ProtectedRoute>}/>
          <Route path="/admin/company/create" element={<ProtectedRoute><CompnayCreate/></ProtectedRoute>}/>
          <Route path="/admin/jobs" element={<ProtectedRoute><CreatedJobs/></ProtectedRoute>}/>
          <Route path="/admin/job/create" element={<ProtectedRoute><CreatJob/></ProtectedRoute>}/>
          <Route path="/admin/job/:id/edit" element={<EditJob/>}/>
          <Route path="/admin/company/:id/edit" element={<EditCompany/>}/>
          <Route path="/admin/:id/applicants" element={<Applicants/>}/>
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
