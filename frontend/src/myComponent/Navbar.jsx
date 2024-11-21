import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUser } from "@/redux/userSlice";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // console.log(user);
  const navigate = useNavigate();
  let handleLogout = async () => {
    try {
      await axios.post("/user/logout");
      toast.success("Logged out");
      navigate("/login");
      dispatch(getUser(null));
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="">
      <div className="flex justify-between px-7 max-w-7xl h-16 items-center">
        <Link to={"/"}>
          <h1 className="text-3xl ">
            job<span className="font-semibold text-orange-700">Port</span>
          </h1>
        </Link>

        <div className="flex items-center gap-10 font-semibold text-xl">
          <div className="flex list-none gap-3">
            {user?.role === "seeker" ? (
              <>
                <li>
                  <Link to={"/"} className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/jobs"} className="hover:underline">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to={"/savedJobs"} className="hover:underline text-md">
                    Savedjobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <Link to={'/admin/jobs'}>Job</Link>
                <Link to={'/'}>Company</Link>
              </>
            )}
          </div>
          {!user ? (
            <div className="flex items-center gap-2 ">
              <Link to={"/login"}>
                <Button
                  variant="outline"
                  className="border border-black hover:bg-gray-200 font-bold"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button className="bg-purple-600">SignUp</Button>{" "}
              </Link>
            </div>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profileImg} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user?.profile?.profileImg} />
                      </Avatar>
                      <div>
                        <h1 className="text-xl font-semibold ">
                          {user?.userName}
                        </h1>
                        <h2 className="line-clamp-1 text-gray-400 -mt-2 text-md">
                          {user.profile?.bio}
                        </h2>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mt-3">
                      <div className="flex items-center ">
                        <User2 />
                        <Link to={"/profile"}>
                          <Button variant="link">view profile</Button>
                        </Link>
                      </div>
                      <div className="flex items-center">
                        <LogOut />
                        <Button variant="link" onClick={handleLogout}>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
