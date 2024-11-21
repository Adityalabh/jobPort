import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/myComponent/Navbar";
import { setCurrJob } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

const EditJob = () => {
  const [formInp, setFromInp] = useState({
    title: "",
    jobType: "",
    requirements: "",
    salary: "",
    location: "",
    position: "",
    description: "",
    // company: "",
    YrExperience: "",
  });
  const [companyName ,setCompanyName]= useState();
  const [MycompanyId ,setCompanyId] = useState('');
  const param = useParams();
  const jobId = param.id;

  useEffect(() => {
    axios.get(`/job/getjobById/${jobId}`).then((res) => {
      dispatch(setCurrJob(res.data));
      //   console.log(res.data);
    });
  }, [jobId]);

  const { currJob } = useSelector((store) => store.jobs);
  const {company} = useSelector((store)=> store.company);
  //   console.log("cuurJob",currJob);

  const customStyl = {
    inpStyl: " mb-4 outline-none ",
    labelStyl: "text-md mb-2 font-semibold",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFromInp({
      title: currJob.title || "",
      jobType: currJob.jobType || "",
      requirements: currJob.requirements || "",
      salary: currJob.salary || "",
      location: currJob.location || "",
      position: currJob.position || "",
      description: currJob.description || "",
    //   company: currJob.company.companyName || "",
      YrExperience: currJob.YrExperience || "",

    });
    setCompanyName(currJob.company.companyName || "");
    setCompanyId(currJob.company._id);

  }, [dispatch, currJob]);
  console.log(formInp,MycompanyId);
  const handleInp = (e) => {
    setFromInp({ ...formInp, [e.target.id]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
        const dataToSend = {...formInp,MycompanyId};
      await axios.put(`/job/jobEdit/${jobId}`, dataToSend).then((res) => {
        toast.success(res.data.message);
        navigate("/admin/jobs");
        // console.log(MycompanyId);
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      // console.log(MycompanyId.toString());

    }
  };
  


  return (
    <div>
      <div className="sticky top-0 shadow-md bg-white">
        <Navbar />
      </div>
      <div>
        <form onSubmit={handleForm}>
          <div className="min-h-screen bg-gray-100 pt-7">
            <div className="w-5/6 mx-auto ">
              <h1 className="text-2xl font-bold text-center">Edit Job</h1>
              <label htmlFor="" className={customStyl.labelStyl}>
                Job title
              </label>
              <Input
                placeholder="Enter job role"
                required
                className={customStyl.inpStyl}
                id="title"
                value={formInp.title}
                onChange={handleInp}
              />
              <label htmlFor="" className={customStyl.labelStyl}>
                Job Type
              </label>
              <Input
                placeholder="ex: full time,Part time"
                required
                className={customStyl.inpStyl}
                id="jobType"
                value={formInp.jobType}
                onChange={handleInp}
              />
              <label htmlFor="" className={customStyl.labelStyl}>
                Requirements
              </label>
              <Input
                placeholder="Enter required skills"
                required
                className={customStyl.inpStyl}
                id="requirements"
                value={formInp.requirements}
                onChange={handleInp}
              />
              <div className="flex flex-col my-2">
                <label htmlFor="" className={customStyl.labelStyl}>
                  Description
                </label>
                <textarea
                  placeholder="Enter details related to job"
                  required
                  id="description"
                  className={customStyl.inpStyl + " pt-2 pl-2"}
                  value={formInp.description}
                  onChange={handleInp}
                ></textarea>
              </div>
              <label htmlFor="" className={customStyl.labelStyl}>
                Location
              </label>
              <Input
                placeholder="Enter company location"
                required
                id="location"
                className={customStyl.inpStyl}
                value={formInp.location}
                onChange={handleInp}
              />
              <label htmlFor="" className={customStyl.labelStyl}>
                Position
              </label>
              <Input
                placeholder="Enter number of position available"
                required
                type="number"
                min={0}
                className={customStyl.inpStyl}
                id="position"
                value={formInp.position}
                onChange={handleInp}
              />
              <label htmlFor="" className={customStyl.labelStyl}>
                Salary
              </label>
              <Input
                placeholder="salary in lpa"
                className={customStyl.inpStyl}
                id="salary"
                //   type="number"
                value={formInp.salary}
                onChange={handleInp}
              />
              <label htmlFor="" className={customStyl.labelStyl}>
                Experience
              </label>
              <Input
                placeholder="Enter number of year of experience"
                required
                className={customStyl.inpStyl}
                id="YrExperience"
                type="number"
                min={0}
                value={formInp.YrExperience}
                onChange={handleInp}
              />
              <label htmlFor="" className={customStyl.labelStyl} >Select Company</label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    id="role"
                    className="w-full border-none flex justify-start text-gray-600"
                  >
                    {companyName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[23.7rem]">
                  {/* <DropdownMenuItem onSelect={()=>handleMenu('')}> </DropdownMenuItem> */}
                  {company.map((item,index)=>(
                    <DropdownMenuItem key={index} onSelect={()=>{setCompanyId(item._id),setCompanyName(item.companyName)}}>
                    {item.companyName}
                  </DropdownMenuItem>
                  ))}
                 
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="w-full my-3" type="submit">
                Edit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
