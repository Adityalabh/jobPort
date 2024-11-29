import FilteredJobs from "@/myComponent/FilteredJobs";
import Navbar from "@/myComponent/Navbar";
import React from "react";
import { useSelector } from "react-redux";

const SavedJobs = () => {
  const { user } = useSelector((store) => store.user);
  // console.log(user.profile.savedJobs.map((job) => job));

  return (
    <div className=" overflow-x-hidden">
      <div className="sticky top-0 shadow-lg bg-white z-50">
        <Navbar />
      </div>
      <div>
        {user.profile.savedJobs.length === 0 && (
          <div className="text-xl text-gray-400 min-h-screen min-w-full flex justify-center items-center">
            No Jobs saved yet😴!
          </div>
        )}
      </div>
      <div className="w-full grid xl:grid-cols-3 md:grid-cols-2 min-h-screen bg-gray-100">
        {user.profile.savedJobs.length > 0 &&
          user?.profile?.savedJobs.map((item, index) => (
              <div key={index} className="m-4 ">
                <FilteredJobs job={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SavedJobs;
