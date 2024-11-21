import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import JobProfile from "@/Pages/JobProfile";
import { timeSince } from "@/utils/timeFormater";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { getUSerRRefresh } from "@/redux/userSlice";
import { useGetUser } from "@/hooks/useGetUser";

const FilteredJobs = ({ job }) => {
  // const {srchJobByText} = useSelector((store)=>store.jobs);
  // const [filteredJob ,setFilteredJob] = useState();

  // useEffect(()=>{
  //   if()
  // },[srchJobByText]);

  const dispatch = useDispatch();
  useGetUser();

  const [open, setOpen] = useState(false);
  const {user} = useSelector(store => store.user);

  const handleSaveJob = async (jobId) => {
    try {
      await axios.patch(`/user/savejob/${jobId}`);
      toast.success('job saved successfully');
      dispatch(getUSerRRefresh());
      // dispatch(getUSerRRefresh)
    } catch (error) {
      toast.error(error);
      // console.log(error);
    }
  };

  // console.log('savedJobs',user?.profile?.savedJobs.some(savedjob => savedjob._id === job._id));
  // console.log('job',  job?._id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className=" border border-gray-300  p-2 rounded-md shadow-xl hover:scale-105 cursor-pointer h-fit min-w-72"
    >
      <div className="flex justify-between ">
        <p>{timeSince(job?.createdAt)} </p>
        <Button variant="outline">
          <i className="fa-regular fa-bookmark"></i>
        </Button>
      </div>
      <div>
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={job.company?.logo} />
          </Avatar>
          <div>
            <h1 className="font-semibold">
              {job?.company?.companyName[0].toUpperCase() +
                job?.company?.companyName.slice(1)}
            </h1>
            <h2>{job?.location}</h2>
          </div>
        </div>
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="line-clamp-2 text-gray-400">{job?.description}</p>
        <div>
          <Badge variant="ghost" className="text-red-600 font-bold">
            {job?.position} Position
          </Badge>
          <Badge variant="ghost" className="text-blue-600 font-bold">
            {job?.jobType}
          </Badge>
          <Badge variant="ghost" className="text-green-600 font-bold">
            {job?.salary}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Details
            </Button>
          </>
          {open && <JobProfile open={open} setOpen={setOpen} job={job} />}
          <Button
            className="bg-purple-700 hover:bg-purple-800 h-13"
            onClick={() => handleSaveJob(job?._id)}
            // disabled={user.profile.savedJobs.some(id => id === job._id)} OR
            disabled = {user?.profile?.savedJobs.some(savedJob => savedJob._id === job._id)}
          >
           {!user?.profile?.savedJobs.some(savedJob => savedJob._id === job._id) === true ? 'Save for later' : 'Saved'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilteredJobs;
