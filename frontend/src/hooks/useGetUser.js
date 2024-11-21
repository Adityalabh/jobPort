import { getUser } from "@/redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetUser = ()=>{
    const {user ,userRefresh} = useSelector(store => store.user);
    const dispatch = useDispatch();
    try {
        useEffect(() => {
            try {
              axios.get(`/user/profile/${user._id}`).then((res) => {
                dispatch(getUser(res.data));
                // console.log('role',user.role === 'seeker');
              });
            } catch (error) {
              console.log(error.message);
            }
          }, [userRefresh]);
    } catch (error) {
        console.log(error);
    }
}