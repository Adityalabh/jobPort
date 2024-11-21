import Navbar from "@/myComponent/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditProfile from "./EditProfile";
import axios from "axios";
import { getUser } from "@/redux/userSlice";
import ApplicationTable from "@/myComponent/ApplicationTable";
import EditRecuiterProfile from "./EditRecuiterProfile";
import { useGetUser } from "@/hooks/useGetUser";

const Profile = () => {
  const { user, userRefresh } = useSelector((store) => store.user);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

 useGetUser();

  // console.log("userRefresh", userRefresh);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur-xl shadow-md">
        <Navbar />
      </div>

      <div className="w-full mt-7 px-12 mb-4">
        {user && (
          <div>
            <div className="p-3 border border-gray-300 rounded-lg">
              <div className="flex flex-col z-0">
                {/* Banner Image */}
                <div>
                  <img
                    src={user.profile?.bannerImg || "defaultBanner.jpg"}
                    alt="Banner"
                    className="rounded-xl w-full h-64 object-cover"
                  />
                </div>
                {/* Profile Avatar */}
                <div className="w-1/6 z-10 flex -mt-14 justify-center">
                  <Avatar className="w-32 h-32 shadow-xl border-4 border-purple-300">
                    <AvatarImage
                      src={user.profile?.profileImg || "defaultProfile.jpg"}
                      alt="Profile"
                    />
                  </Avatar>
                </div>
              </div>
              <div className="flex justify-between px-10">
                <div>
                  {/* User Name */}
                  <h1 className="text-3xl mt-4 font-semibold font-mono">
                    {user?.userName
                      ? user.userName[0].toUpperCase() + user.userName.slice(1)
                      : "User"}
                  </h1>
                  {/* Bio */}
                  <div className="my-3 text-lg text-gray-500">
                    {user.profile?.bio || (
                      <div>Add here description all about you...</div>
                    )}
                  </div>
                  {/* Skills */}
                  {user.profile.skills.length > 0 && user.role === 'seeker' && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {user.profile.skills.map((skill, index) => (
                        <Badge key={index} className="bg-purple-600">
                          {skill[0].toUpperCase() + skill.slice(1)}
                        </Badge>
                      ))}
                    </div>
                  )}

                  { user.role !== 'recruiter' && (
                    <div className="flex w-full">
                      <p className="font-semibold pr-2">Resume:</p>
                      <a
                        href={user?.profile?.resume}
                        target="_blank" // Open in a new tab
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {user.profile.resumeOriginalName}
                      </a>
                    </div>
                  )}
                  {/* Contact Information */}
                  <div className="w-full flex gap-4 font-semibold">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-phone"></i>
                      {user?.phoneNumber || "N/A"}
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-envelope"></i>
                      {user?.email || "N/A"}
                    </div>
                  </div>
                </div>
                {/* Edit Button and Dialog */}
                <div>
                  <Button
                    className="!bg-purple-700 flex gap-2"
                    onClick={() => setOpen(true)}
                  >
                    Edit
                    <i className="fa-solid fa-pen"></i>
                  </Button>

                  {open === true && (
                    user.role === 'seeker' ? <EditProfile open={open} setOpen={setOpen}/> : <EditRecuiterProfile open={open} setOpen={setOpen}/> 
                  )}

                  

                </div>
              </div>
            </div>
            {user.role === "seeker" && (
              <div>
                <ApplicationTable />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;