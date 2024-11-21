import FilteredJobs from "@/myComponent/FilteredJobs";
import Navbar from "@/myComponent/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BrowseJob = () => {
  const { alljobs, srchJobByText } = useSelector((store) => store.jobs);
  const [filteredJob, setFilteredJob] = useState([]);

  useEffect(() => {
    if (Array.isArray(alljobs) && alljobs.length > 0) {
      const filterJob = alljobs.filter((jobs) => {
        if (!srchJobByText) {
          return true;
        }
        return jobs?.title.toLowerCase().includes(srchJobByText.toLowerCase());
      });
      setFilteredJob(filterJob);
    } else {
      setFilteredJob([]);
    }
  }, [srchJobByText]);

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur-xl shadow-md">
        <Navbar />
      </div>

      <div className="px-7 my-7 ">
        <h1 className="text-2xl ml-2 font-semibold my-7">
          Search Result &nbsp;({filteredJob.length})
        </h1>

        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 ">
          {filteredJob.length === 0 && (
            <div className="flex items-center justify-center min-h-[70vh] min-w-[80vw] text-gray-600">
              No jobs are found 🙄!
            </div>
          )}
          {filteredJob.length > 0 &&
            filteredJob.map((job, index) => (
              <div key={index}>
                <FilteredJobs job={job} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseJob;
