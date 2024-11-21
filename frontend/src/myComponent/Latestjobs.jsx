import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SrchFromInp from "@/utils/SrchFromInp";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Latestjobs = () => {
  // const jobs = [1, 2, 4, 5, 6, 7];
  const { alljobs } = useSelector((store) => store.jobs);
  const { srchJobByText } = useSelector((store) => store.jobs);
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

  // const result = SrchFromInp();
  // console.log(result);
  // setFilteredJob(result);

  return (
    <div className="w-full px-16 ">
      <h1 className="text-4xl font-semibold px-7">
        Latest &
        <span className="text-purple-700 font-bold">Top Job Openings</span>
      </h1>
      
      {/* latest jobs cards */}

      {filteredJob?.length === 0 && <div className="flex justify-center mt-20 text-xl text-gray-400">No jobs availabel right now 🙄!</div>}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 my-12 gap-2">
        {filteredJob.length > 0 &&
          filteredJob.map((alljob, index) => (
            <Link to={"/jobs"} key={index}>
              <div className="border border-gray-300 mx-3 rounded-lg p-4 shadow-xl bg-white cursor-pointer hover:scale-105 min-w-72">
                <div>
                  <div className="flex justify-between">
                    <h1 className="font-semibold text-xl">
                      {alljob?.company?.companyName[0].toUpperCase() +
                        alljob?.company?.companyName.slice(1)}
                    </h1>
                    <Avatar className="h-[50px] w-[50px]">
                      <AvatarImage src={alljob?.company?.logo} className="border-2 border-gray-300 rounded-full "/>
                    </Avatar>
                  </div>
                  <p className="text-gray-400 -mt-2 text-md">
                    {alljob?.company?.location}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold">{alljob?.title}</h1>
                  <p>{alljob?.description} </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="ghost" className="text-red-600 font-bold ">
                    {alljob.position + " Position"}
                  </Badge>
                  <Badge variant="ghost" className="text-blue-600 font-bold">
                    {alljob?.jobType}
                  </Badge>
                  <Badge variant="ghost" className="text-green-600 font-bold">
                    {alljob?.salary}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Latestjobs;
