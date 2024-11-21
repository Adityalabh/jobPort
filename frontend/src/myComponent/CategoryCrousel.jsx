import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setsrchJobByText } from "@/redux/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryCrousel = () => {
  const {alljobs} = useSelector((store)=>store.jobs);
  const [category,setCategory] = useState(['Frontend','Backend','Blockchain','Fullstack']);

  

  const [catgInp, setCatInp] = useState("");
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   if(alljobs.length > 0 ){
  //       const jobTitle = alljobs.map(job => job.title);
  //       const uniqueTitle = [...new Set(jobTitle)];
  //       setCategory(uniqueTitle);
  //   }
  //  },[alljobs]);

  // useEffect(() => {
  //   dispatch(setsrchJobByText(catgInp));
  // }, [catgInp]);

  

  return (
    <div>
      <Carousel className="lg:w-full md:w-[400px] sm:w-[300px] max-w-xl  mx-auto my-7  px-4">
        <CarouselContent>
            {category?.length === 0 && <div> No category</div>}

          {category?.length > 0 && category.map((cat, index) => (
            <CarouselItem className=" md:basis-2/3 lg:basis-1/3" key={index}>
              <Button
                className="rounded-full  border-2"
                variant="outline"
                onClick={() => dispatch(setsrchJobByText(cat))}
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-300" />
        <CarouselNext className="bg-gray-300" />
      </Carousel>
    </div>
  );
};

export default CategoryCrousel;
