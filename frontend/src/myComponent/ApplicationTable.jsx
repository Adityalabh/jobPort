import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";



const ApplicationTable = () => {
  const [appliedJob ,setAppliedJob] = useState([]);

  useEffect(() => {
    try {
      axios.get(`/application/getApplieJobs`).then((res) => {
        // console.log(res.data);
        setAppliedJob(res.data);
        // console.log(appliedJob);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const application = [1, 2, 3, 4];
  return (
    <div>
      <h1 className="text-xl font-bold mt-4 mb-2 px-2">Applied Jobs</h1>
      <Table className="">
        <TableCaption>A list of your applied Jobs.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJob.map((item, index) => (
            <TableRow key={index} className="">
              <TableCell className="font-medium">{item?.createdAt.slice(0,10).split('-').reverse().join('-')}</TableCell>
              <TableCell>{item?.job?.title }</TableCell>
              <TableCell>{item?.job?.company?.companyName}</TableCell>
              <TableCell className="">
                <Badge>{item?.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
