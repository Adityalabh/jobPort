import { Input } from "@/components/ui/input";
import Navbar from "@/myComponent/Navbar";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button, TableBody, TableRow } from "@mui/material";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Edit2, Eye, EyeIcon, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetAllAdminJob from "@/hooks/useGetAlladminJob.js";
import { setsrchJobByText } from "@/redux/jobSlice";

const CreatedJobs = () => {
  useGetAllAdminJob(); ///->this hook getting all admin job
  const { allAdminJob } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.user);
  const [jobInp, setJobInp] = useState("");
  const dispatch = useDispatch();
  const { srchJobByText } = useSelector((store) => store.jobs);
  const [filteredJob, setFilteredJob] = useState("");
  const { company } = useSelector((store) => store.company);
  //   console.log(srchJobByText);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setsrchJobByText(jobInp));
  }, [jobInp]);

  // console.log(company.length);

  //   console.log(allAdminJob);
  useEffect(() => {
    if (Array.isArray(allAdminJob) && allAdminJob.length > 0) {
      const filterJob = allAdminJob?.filter((adminJob) => {
        if (!srchJobByText) {
          return true;
        }
        //   console.log('job tittle',adminJob?.title.toLowerCase());
        return adminJob?.title
          .toLowerCase()
          .includes(srchJobByText.toLowerCase()); //here from adminjob it return list of job in which it checks is there any job matches with input
      });
      setFilteredJob(filterJob);
    } else {
      setFilteredJob([]);
    }
    // console.log(filtercomp,filtercomp);
  }, [allAdminJob, srchJobByText]);

  return (
    <div>
      <div className="sticky top-0 shadow-md z-50 bg-white">
        <Navbar />
      </div>

      <div className="min-h-screen">
        <div className="flex mt-9 w-5/6 gap-3 mx-auto justify-between ">
          <Input
            placeholder="filter by Job role"
            className="w-[80%]"
            onChange={(e) => setJobInp(e.target.value)}
          />
          {/* <Link to={"/admin/job/create"}>
            <Button disabled>New Job</Button>
          </Link> */}

          {company.length > 0 ? (
            <Button
              onClick={() => navigate("/admin/job/create")}
              variant="contained"
            >
              New Job
            </Button>
          ) : (
            <Button disabled>New Job</Button>
          )}
        </div>

        <div>
          {filteredJob.length === 0 ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              No jobs are created!
            </div>
          ) : (
            <Table className="w-5/6 mx-auto border my-7">
              <TableCaption>A list of your recent created jobs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJob?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={item.company.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item.company?.companyName[0].toUpperCase() +
                        item.company?.companyName.slice(1)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item?.title[0].toUpperCase() + item?.title.slice(1)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item?.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal></MoreHorizontal>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit">
                          < >
                            <span className="flex gap-2">
                              <Edit2 className="w-4" />
                              <Link to={`/admin/job/${item?._id}/edit`}>
                                <span>Edit</span>
                              </Link>
                            </span>
                            <hr />
                            <span className="flex  mt-1">
                              <Link to={`/admin/${item?._id}/applicants`}>
                                <span className="flex gap-2 items-center">
                                  <i className="fa-regular fa-eye"></i>
                                  Applicants
                                </span>
                              </Link>
                            </span>
                          </>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatedJobs;
