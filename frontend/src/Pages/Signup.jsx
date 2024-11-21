import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUser } from "@/redux/userSlice";

const Signup = () => {
  const customStyle = {
    formLabel: "font-semibold text-md mt-1",
    formInput: "rounded-md border-2 ",
  };

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "seeker",
    // profileImg: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleMenu = (value) => {
    setFormData({ ...formData, role: value });
  };

  // const fileHandler = (e) => {
  //   setFormData({ ...formData, profileImg: e.target.files?.[0] });
  // };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/register", formData);
      // console.log(res.data);

      toast.success("signup Successfully");
      navigate("/login");
      setLoading(true);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  //   console.log(loading);

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1  items-center justify-center ">
        <div className="flex-col ml-7">
          <h1 className="text-3xl font-bold ">Signup</h1>
          <h2 className="text-gray-400">Create free account</h2>

          <form onSubmit={handleForm} className="mt-4 ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="userName" className={customStyle.formLabel}>
                Fullname
              </Label>
              <Input
                id="userName"
                className={customStyle.formInput}
                placeholder="Aditya Labh"
                value={formData.userName}
                onChange={formHandler}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className={customStyle.formLabel}>
                Email addres
              </Label>
              <Input
                id="email"
                type="email"
                className={customStyle.formInput}
                placeholder="@adityalabh@gmail.com"
                value={formData.email}
                onChange={formHandler}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password" className={customStyle.formLabel}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className={customStyle.formInput}
                placeholder="@1234"
                value={formData.password}
                onChange={formHandler}
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 ">
              <Label htmlFor="phoneNumber" className={customStyle.formLabel}>
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="Number"
                className={customStyle.formInput}
                placeholder="991090234"
                value={formData.phoneNumber}
                onChange={formHandler}
                required
              />
            </div>

            <div className={`flex flex-col w-4/4 `}>
              <label htmlFor="" className={customStyle.formLabel}>
                Roles
              </label>
              <div
                className={`border  border-gray-300  ${customStyle.formInput}`}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      id="role"
                      className="w-[23.7rem]  border-none flex justify-start text-gray-600"
                    >
                      {formData.role || "Select New Role"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[23.7rem]">
                    {/* <DropdownMenuItem onSelect={()=>handleMenu('')}> </DropdownMenuItem> */}
                    <DropdownMenuItem onSelect={() => handleMenu("seeker")}>
                      Seeker
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleMenu("recruiter")}>
                      Recruiter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* <div>
              <Label>Profile</Label>
              <Input type="file" onChange={fileHandler} />
            </div> */}
            <div className="flex items-center justify-center mt-2">
              <Button
                className={`w-full my-3 !bg-purple-800  transition-transform duration-100  hover:scale-95 `}
                type="Submit"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    Please wait
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
          <div className="flex justify-center text-gray-400">
            Already register
            <Link
              to={"/login"}
              className="underline mx-1 text-purple-400 cursor-pointer font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-end">
        <img src="/image.png" alt="image" className="h-screen lg:w-[550px] " />
      </div>
    </div>
  );
};

export default Signup;
