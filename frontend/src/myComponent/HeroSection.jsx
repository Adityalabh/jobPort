import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setsrchJobByText } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  // const {srchJobByText} = useSelector((store)=>store.jobs);
  const dispatch= useDispatch();
  const [srchInp ,setSrchInput] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(setsrchJobByText(srchInp));
  },[srchInp]);

  return (
      <div
        className="h-80 flex flex-col justify-center text-center"
        style={{ backgroundImage: 'url("/heroSection_image.png")' }}
      >
        <span className="w-fit mx-auto h-20 text-4xl text-white font-bold  mt-32 backdrop-blur-sm">
          Search and apply your 
          <span className="text-purple-600 block">Dream job</span>
        </span>

        <div className="flex w-2/3 mx-auto relative mt-4 -mb-5">
          <input
            className=" mx-auto rounded-l-[1rem] rounded-r-none outline-none w-[89%] px-3"
            placeholder="Find your dream job"
            onChange={(e)=>{setSrchInput(e.target.value)}}
          />
          <Button className="bg-purple-600 rounde rounded-r-[1rem] rounded-l-none  w-[11%] hover:bg-purple-700" onClick={()=>navigate('/browse')}>
            <i className="fa-solid fa-magnifying-glass text-lg" ></i>
          </Button>
        </div>
      </div>
  );
};

export default HeroSection;
