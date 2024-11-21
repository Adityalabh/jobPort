import Latestjobs from "@/myComponent/Latestjobs";
import CategoryCrousel from "@/myComponent/CategoryCrousel";
import Footer from "@/myComponent/Footer";
import HeroSection from "@/myComponent/HeroSection";
import Navbar from "@/myComponent/Navbar";
import React, { useEffect } from "react";
import usegetAllJobs from "@/hooks/usegetAllJobs.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LandingPage from "./RecruiterSide/LandingPage";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  usegetAllJobs();

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50  bg-white bg-opacity-70 backdrop-blur-lg shadow-xl">
        <Navbar />
      </div>
      <div className="flex-grow">
        {user?.role === "seeker" ? (
          <div>
            <HeroSection />
            <CategoryCrousel />
            <Latestjobs />
          </div>
        ) : (
          <div>
            {/* recruiter side */}
            <LandingPage />
          </div>
        )}
        <Footer className="" />
      </div>
    </div>
  );
};

export default Home;
