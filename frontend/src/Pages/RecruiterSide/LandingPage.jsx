import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableBody, TableRow } from "@mui/material";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, getSrchCompByName } from "@/redux/compnaySlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const [compNameText,setCompNameText] = useState('');
  const [filtercomp ,setFilterComp] = useState('');
  const { company,srchCompByName } = useSelector((store) => store.company);

  useEffect(() => {
    axios.get("/company/profile").then((res) => {
      dispatch(getCompany(res.data));
      // console.log("all companies", res.data);
    });
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getSrchCompByName(compNameText));
  },[compNameText,dispatch]);

  useEffect(()=>{
    if(Array.isArray(company) && company.length > 0 ){
    const filteredComp =  company?.filter((companies)=>{
      if(!srchCompByName){
          return true;
      }
      // console.log('compName',companies?.companyName);
      return companies?.companyName.toLowerCase().includes(srchCompByName.toLowerCase());
    });
    setFilterComp(filteredComp);
  }else{
    setFilterComp([]);
  }
    // console.log(filtercomp,filtercomp);
  },[company,srchCompByName]);

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-2 mt-9 w-4/6 mx-auto justify-between">
        <Input placeholder="filter by name" className="w-[80%]" onChange={(e)=>setCompNameText(e.target.value)}/>
        <Link to={"/admin/company/create"}>
          <Button>New Company</Button>
        </Link>
      </div>
      
      <div>
        {filtercomp.length === 0 ? (
          <div className="flex justify-center items-center min-h-[50vh]">No companies are registered!</div>
        ):(
          <Table className="w-5/6 mx-auto border my-7">
          <TableCaption>A list of your recent register company</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { filtercomp?.map((item, index) => (
                <TableRow  key={item._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={item?.logo}/>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {item?.companyName[0].toUpperCase() +
                      item?.companyName.slice(1)}
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
                        <div className="flex gap-2 ">
                          <Edit2 className="w-4" />
                          <Link to={`/admin/company/${item?._id}/edit`}>
                            <span>Edit</span>
                          </Link>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            }
            
          </TableBody>
        </Table>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
