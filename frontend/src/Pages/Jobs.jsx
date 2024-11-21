import usegetAllJobs from "@/hooks/usegetAllJobs";
import { useGetUser } from "@/hooks/useGetUser";
import FilteredJobs from "@/myComponent/FilteredJobs";
import JobFilter from "@/myComponent/JobFilter";
import Navbar from "@/myComponent/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Jobs = () => {
  // const filterJob = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { alljobs } = useSelector((store) => store.jobs);
  usegetAllJobs();
  // useGetUser();

  const { srchJobByText } = useSelector((store) => store.jobs);
  const [filteredJob, setFilteredJob] = useState();
  const [toggleIcon, settoggleIcon] = useState(false);
  const {jobRefresh} = useSelector((store)=>store.jobs);

  useEffect(() => {
    if (Array.isArray(alljobs) && alljobs.length > 0) {
      const filterJob = alljobs.filter((jobs) => {
        if (!srchJobByText) {
          return true;
        }
        return (
          jobs?.title.toLowerCase().includes(srchJobByText?.toLowerCase()) ||
          jobs?.location.toLowerCase().includes(srchJobByText?.toLowerCase()) ||
          jobs?.salary.toLowerCase().includes(srchJobByText?.toLowerCase())
        );
      });
      setFilteredJob(filterJob);
      // console.log("jobs", filterJob);
    } else {
      setFilteredJob([]);
    }
  }, [srchJobByText,jobRefresh]);

  // const handleToggle = () => {
  //   settoggleIcon(!toggleIcon);
  // };

  // console.log(toggleIcon);

  return (
    <div className="">
      <div className="sticky z-50 top-0 bg-white border-b shadow-md border-gray-300">
        <Navbar />
      </div>
      <div className="w-full flex min-h-screen relative bg-gray-100">
        <div
          className={` ${
            toggleIcon === false
              ? "hidden "
              : "flex shadow-2xl border-r border-gray-300 "
          }  min-h-screen md:flex md:relative md:shadow-sm  justify-center border-r px-4   z-40 bg-white `}
        >
          <div className="mt-7 ">
            <JobFilter className="" />
          </div>
        </div>

        {/* Toggle */}
        <div
          onClick={() => settoggleIcon(!toggleIcon)}
          className=" z-50 md:hidden h-fit w-fit cursor-pointer"
        >
          {!toggleIcon ? (
            <i className="fa-solid fa-bars  text-2xl  my-4 mx-2 hover:bg-gray-400 rounded-full p-1"></i>
          ) : (
            <i className="fa-solid fa-x fixed ml-48 text-xl my-4 hover:bg-gray-300 pr-1 rounded-full"></i>
          )}
        </div>

        {filteredJob?.length === 0 && (
          <div className="flex justify-center w-[60vw] text-xl items-center text-gray-400">
            No jobs are found 🙄!
          </div>
        )}

        {/* side content */}
        <div className={`w-full min-h-screen grid xl:grid-cols-3 md:grid-cols-2 mt-9 `}>
          {filteredJob?.length > 0 &&
            filteredJob.map((job, index) => (
              <div key={index} className="px-2 ">
                <FilteredJobs job={job} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
