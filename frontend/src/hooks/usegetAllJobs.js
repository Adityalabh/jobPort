import { getJob } from "@/redux/jobSlice.js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const usegetAllJobs = ()=>{
    const {jobRefresh} = useSelector((store)=>store.jobs);
    const dispatch = useDispatch();
    useEffect(()=>{
       try {
        axios.get('/job/getallJobs').then((res)=>{
            dispatch(getJob(res.data)); 
        });

       } catch (error) {
        toast.error(error.response.message);
        console.log(error.message);
       }
    },[ jobRefresh]);  
}

export default usegetAllJobs;