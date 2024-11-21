import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/myComponent/Navbar";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Loader } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { green } from "@mui/material/colors";

const Applicants = () => {
  const [applied, setApplied] = useState();
  const [loading, setLoading] = useState(false);
  //   const [newStatus, setNewStatus] = useState();
  const [aplcnt, setaplcnt] = useState({ statusId: "", newStatus: "" });
  const [refresh, setRefresh] = useState(false);
  const param = useParams();
  const jobId = param.id;

  useEffect(() => {
    setLoading(true);
    try {
      axios.get(`/application/getApplicants/${jobId}`).then((res) => {
        setApplied(res.data);
      });
      // console.log(applied);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }, [jobId, refresh]);

  // console.log(refresh);

  useEffect(() => {
    // console.log(aplcnt.statusId, aplcnt.newStatus);
    if (aplcnt.statusId) {
      try {
        axios
          .post(`/application/status/${aplcnt.statusId}/update`, {
            status: aplcnt.newStatus,
          })
          .then((res) => {
            console.log(res.data);
          });
        setRefresh(!refresh);
      } catch (error) {
        console.log(error);
      }
    }
  }, [aplcnt.statusId, aplcnt.newStatus]);

  return (
    <div>
      <div className="sticky top-0 shadow-md z-50 bg-white">
        <Navbar />
      </div>
      {applied?.applications?.length === 0 && (
        <div className="min-h-screen flex justify-center items-center text-gray-400 text-xl">
          No One Applied Yet😴!
        </div>
      )}
      {applied?.applications?.length > 0 && (
        <div div className="min-h-screen bg-gray-100 -mt-6">
          <div className="w-5/6 mx-auto ">
            <h1 className="text-2xl font-semibold my-7 pt-7">
              Applicants ({applied?.applications?.length})
            </h1>
            <Table>
              <TableCaption>List of recent all applied applicants</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applied?.applications.map((items, index) => (
                  <TableRow key={index}>
                    <TableCell>{items?.applicant?.userName}</TableCell>
                    <TableCell>{items?.applicant?.email}</TableCell>
                    <TableCell>{items?.applicant?.phoneNumber}</TableCell>
                    <TableCell className="hover:underline text-blue-700">
                      <a href={items?.applicant?.profile.resume}>
                        {items?.applicant?.profile?.resumeOriginalName ||
                          "empty"}
                      </a>
                    </TableCell>
                    <TableCell>{items?.createdAt?.slice(0, 9)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          items?.status === "accepted"
                            ? "bg-green-500"
                            : items.status === "rejected"
                            ? "bg-red-500"
                            : "bg-black"
                        }
                      >
                        {items?.status[0].toUpperCase() +
                          items?.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal></MoreHorizontal>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit ">
                          <>
                            <div
                              className="flex m-1 cursor-pointer text-green-700"
                              onClick={() => {
                                setaplcnt({
                                  ...aplcnt,
                                  statusId: items._id,
                                  newStatus: "accepted",
                                });
                              }}
                            >
                              Accept
                            </div>
                            <hr />
                            <div
                              className="flex m-1 cursor-pointer text-red-700"
                              onClick={() => {
                                setaplcnt({
                                  ...aplcnt,
                                  statusId: items._id,
                                  newStatus: "rejected",
                                });
                              }}
                            >
                              Reject
                            </div>
                          </>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;
