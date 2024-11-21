import Navbar from "@/myComponent/Navbar";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { timeSince } from "@/utils/timeFormater";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrJob, setCurrJobRefresh, setJobRefresh } from "@/redux/jobSlice";
import { toast } from "react-toastify";
import usegetAllJobs from "@/hooks/usegetAllJobs";
import { Button } from "@/components/ui/button";

const JobProfile = ({ open, setOpen, job }) => {
  const { user } = useSelector((store) => store.user);
  let [isapplied ,setIsapplied] = useState(false);
  const { jobRefresh,currJobRefresh,currJob } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();

  usegetAllJobs();

  // console.log('include', currJob?.applications.includes(user?._id));

  useEffect(() => {
    try {
      axios.get(`/job/getjobById/${job?._id}`).then((res) => {
        dispatch(setCurrJob(res.data));
        setIsapplied(res.data?.applications?.some((application)=>application.applicant === user?._id || false))
        // console.log('job',res.data);
        // console.log('jobrefresh',jobRefresh,currJobRefresh);
      });
    } catch (error) {
      console.log(error);
    }
  }, [job?._id,currJobRefresh]);

  // console.log(isapplied,'jobID',currJob?._id);

  const handleClose = () => {
    setOpen(false);
  };

  const handleJob = async () => {
    try {
      const res = await axios.post(`/application/apply/${currJob?._id}`);
      dispatch(setJobRefresh());
      dispatch(setCurrJobRefresh());
      toast.success(res.data);
      // console.log(jobRefresh);
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  };

  // let isapplied = job?.applications?.some((application)=>application.applicant === user?._id || false);
  // console.log('isapplied',isapplied);

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* Body */}
      <DialogContent className="w-[30rem] h-auto mx-auto my-7">
        <div className="w-full flex justify-between">
          <div className="flex-col">
            <h1 className="text-xl font-semibold">
              {currJob?.title[0].toUpperCase() + currJob?.title.slice(1)}
            </h1>
            <div className="flex mt-3 -ml-3">
              <Badge variant="ghost" className="text-red-600 font-bold">
                {currJob?.position} Position
              </Badge>
              <Badge variant="ghost" className="text-blue-600 font-bold">
                {currJob?.jobType}
              </Badge>
              <Badge variant="ghost" className="text-green-600 font-bold">
                {currJob?.salary}
              </Badge>
            </div>
          </div>
          <div>
            <Button disabled={isapplied} onClick={handleJob}>
              {isapplied ? "Applied" : " Easy apply"}
            </Button>
          </div>
        </div>
        <h1 className="font-semibold mt-4">Job Description</h1>
        <hr className="border border-gray-300 mt-2" />

        <div className="mt-7">
          <p>
            <span className="font-bold pr-4">Role:</span>
            {currJob.title}
          </p>
          <p>
            <span className="font-bold pr-4">Location</span>
            {currJob.location}
          </p>
          <p>
            <span className="font-bold pr-4">Description:</span>
            {currJob.description}
          </p>
          <p>
            <span className="font-bold pr-4">Expreince:</span>
            {currJob.jobType}
          </p>
          <p>
            <span className="font-bold pr-4">Salary:</span>
            {currJob.salary}
          </p>
          <p>
            <span className="font-bold pr-4">Total Applicants:</span>
            {currJob.applications.length}
          </p>
          <p>
            <span className="font-bold pr-4">Posted Date:</span>
            {timeSince(currJob.createdAt)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobProfile;
