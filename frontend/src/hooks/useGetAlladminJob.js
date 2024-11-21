import { setAllAdminJob } from "@/redux/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

 const useGetAllAdminJob = ()=>{
    const {adminJobRefresh} = useSelector((store)=>store.jobs);
    const dispatch = useDispatch();
    useEffect(()=>{
        try {
            axios.get('/job/getAdminJobs').then((res)=>{
                dispatch(setAllAdminJob(res.data));
                // console.log(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    },[adminJobRefresh]);
}

export default useGetAllAdminJob;