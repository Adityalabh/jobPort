import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setsrchJobByText } from "@/redux/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const JobFilter = () => {
  const [filterData, setFilterData] = useState([
    {
      filterType: "Location",
      array: ['Delhi','Gurgao','Mumbai','Banglore'],
    },
    {
      filterType: "Industry",
      array: ['Frontend','Backend','Blockchain','Fullstack'],
    },
    {
      filterType: "Salary",
      array: ['12 LPA','17 LPA','21 LPA'],
    },
  ]);

  const [option, setOption] = useState();
  const dispatch = useDispatch();
  const { alljobs } = useSelector((store) => store.jobs);

  // useEffect(() => {
  //   const jobtitle = alljobs.map((jobs) => jobs?.title);
  //   const jobLocation = alljobs.map((jobs) => jobs?.location);
  //   const jobSalary = alljobs.map(jobs => jobs.salary);

  //   const unqTitle = [...new Set(jobtitle)];
  //   const uniqLocation = [...new Set(jobLocation)];
  //   const uniqSalary = [...new Set(jobSalary)];

  //   setFilterData((prevData) =>
  //     prevData.map((filter) =>
        
  //       filter.filterType === "Industry"
  //         ? { ...filter, array: unqTitle }

  //         : filter.filterType === "Location"
  //         ? { ...filter, array: uniqLocation }

  //         : filter.filterType === 'Salary'
  //         ? {...filter,array:uniqSalary}
  //         :filter
  //     )
  //   );
  // }, [alljobs]);

  useEffect(() => {
    dispatch(setsrchJobByText(option));
  }, [option]);

  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-semibold mb-3">Filter Data</h1>
        <RadioGroup>
          {filterData.map((data, index) => (
            <div key={index}>
              <h1 className="text-xl my-1 font-semibold">{data.filterType}</h1>
              {data.array.map((item, index) => (
                <div key={index} className="flex gap-2 my-2 items-center ">
                  <RadioGroupItem
                    value={item}
                    onClick={() => setOption(item)}
                  />
                  <Label className="text-lg">{(item[0].toUpperCase() + item.slice(1))}</Label>
                </div>
              ))}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default JobFilter;
