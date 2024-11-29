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
  const { jobRefresh } = useSelector((store) => store.jobs);

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
  }, [srchJobByText, jobRefresh]);

  // const handleToggle = () => {
  //   settoggleIcon(!toggleIcon);
  // };

  // console.log(toggleIcon);

  return (
    <div className="">
      <div className="sticky z-50 top-0 bg-white border-b shadow-md border-gray-300">
        <Navbar />
      </div>
      <div className=" flex min-h-screen relative bg-gray-100">

        <div className=" lg:w-[350px] ">
          <div
            className={` ${
              toggleIcon === false
                ? "hidden "
                : "flex shadow-md border-r border-gray-300 w-[200px] absolute bg-white z-30 h-full"
            }  pl-4 md:block lg:shadow-md lg:border-r lg:border-gray-300 py-7  h-full`}
          >
            <div className="pt-4 ">
              <JobFilter className="" />
            </div>

          </div>
          {/* Toggle */}
          <div
            onClick={() => settoggleIcon(!toggleIcon)}
            className=" md:hidden cursor-pointer "
          >
            {!toggleIcon ? (
              <i className="fa-solid fa-bars   text-2xl  my-4 mx-2 hover:bg-gray-300 rounded-full p-1"></i>
            ) : (
              <i className="fa-solid fa-x absolute top-6 z-30 left-40  text-lg my-4 hover:bg-gray-200 p-1 rounded-full"></i>
            )}
          </div>
        </div>

        {filteredJob?.length === 0 && (
          <div className="flex justify-center w-[60vw] text-xl items-center text-gray-400">
            No jobs are found 🙄!
          </div>
        )}

        {/* side content */}
        <div
          className={` min-h-screen grid xl:grid-cols-3 md:grid-cols-2 mt-9 z-0`}
        >
          {filteredJob?.length > 0 &&
            filteredJob.map((job, index) => (
              <div key={index} className="px-2 p-1">
                <FilteredJobs job={job} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
