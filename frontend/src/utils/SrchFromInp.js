import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const SrchFromInp = () => {
    const {alljobs,srchJobByText} = useSelector((store)=>store.jobs);
    useEffect(()=>{
        if(Array.isArray(alljobs) && alljobs.length > 0){
          const filterJob =  alljobs.filter((jobs)=>{
            if(!srchJobByText){
              return true;
            }
            return jobs?.title.toLowerCase().includes(srchJobByText.toLowerCase());
          });
          return filterJob;
        }
        else{
          return [];
        }
        
      },[srchJobByText]);
}

export default SrchFromInp