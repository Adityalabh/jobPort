import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { getUSerRRefresh } from "@/redux/userSlice";
import { ImgFileReader } from "@/utils/ImgFileReader";
import { Loader2 } from "lucide-react";

const EditRecruiterProfile = ({ open, setOpen }) => {
  const customStyl = {
    inpStyl: " mb-3 outline-none",
    labelStyl: "text-md mb-2",
  };
  const { user } = useSelector((store) => store.user);
  const imageRef = React.useRef();
  const profileImgRef = React.useRef();

  const [formData, setfromData] = React.useState({
    userName: user?.userName || "",
    email: user?.email || "",
    // skills: user.profile?.skills || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user.profile?.bio || "",
    profileImgPrev: user.profile?.profileImg || "",
    imagePreview: user.profile?.bannerImg || "",
   
  });
  const [bannerImg, setBannerImg] = useState(user.profile?.bannerImg || "");
  const [profileImg, setProfileImg] = useState(user.profile?.profileImg || "");
//   const [resume ,setResume] = useState(user.profile?.resume || "");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    setfromData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const handleResume = (e)=>{
//     const file = e.target.files?.[0];
//     if(file){
//       setResume(file);
//     }
//   }

  const handleImg = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImg(file);
      // setfromData({...formData,bannerImg:file});
      const dataUrl = await ImgFileReader(file); //////------>it is for handeling imageurl to preview it on webpage before sending to server
      setfromData({ ...formData, imagePreview: dataUrl });
    }
    // console.log(bannerImg);
  };

  const handleProfileImg = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImg(file);
      const dataUrl = await ImgFileReader(file);//helping to display image before uploading
      setfromData({ ...formData, profileImgPrev: dataUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendFormData = new FormData();
    sendFormData.append("userName", formData.userName);
    sendFormData.append("email", formData.email);
    // sendFormData.append("skills", formData.skills);
    sendFormData.append("phoneNumber", formData.phoneNumber);
    sendFormData.append("bio", formData.bio);

    if (bannerImg) {
      sendFormData.append("bannerImg", bannerImg);
    }
    if (profileImg) {
      sendFormData.append("profileImg", profileImg);
    }
    // if(resume){
    //   sendFormData.append("resume",resume);
    // }
    // console.log(resume);
    setLoading(true);
    try {
      const res = await axios.put("/user/edit", sendFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data);

      handleClose();
      dispatch(getUSerRRefresh());
    } catch (error) {
      toast.error(error.response.data);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="rounded-xl">
        <div className="w-[500px]">
          <div className="text-center mt-3 text-xl font-semibold">
            Edit Profile
          </div>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Label className={customStyl.labelStyl}>Name</Label>
              <Input
                value={formData.userName}
                onChange={handleInputs}
                id="userName"
                className={customStyl.inpStyl}
                required
              />
              <Label className={customStyl.labelStyl}>Email</Label>
              <Input
                value={formData.email}
                onChange={handleInputs}
                id="email"
                className={customStyl.inpStyl}
                required
              />
              {/* <Label className={customStyl.labelStyl}>Skills</Label>
              <Input
                value={formData.skills}
                onChange={handleInputs}
                id="skills"
                className={customStyl.inpStyl}
                required
              /> */}
              <Label className={customStyl.labelStyl}>Phone Number</Label>
              <Input
                value={formData.phoneNumber}
                onChange={handleInputs}
                id="phoneNumber"
                className={customStyl.inpStyl}
                type="number"
                required
              />
              <div className="flex flex-col mt-3">
                <Label className={customStyl.labelStyl}>Bio description</Label>
                <textarea
                  value={formData.bio}
                  onChange={handleInputs}
                  id="bio"
                  className={`border border-gray-300 ${customStyl.inpStyl} outline-none`}
                  required
                ></textarea>
              </div>

              {/* <div className="my-3 ">
                
                <Label className={customStyl.labelStyl + "cursor-pointer"} htmlFor="resume" >Resume</Label>
                <Input
                  type="file"
                  id="resume"
                  accept="application/pdf"
                  onChange={handleResume}
                  className="cursor-pointer"
                />
                <a href={formData.resume}>resume</a>
              </div> */}

              <div className="">
                <input
                  type="file"
                  className="hidden"
                  ref={imageRef}
                  onChange={handleImg}
                  id="bannerImg"
                />
                <Label className={customStyl.labelStyl}>Banner Img</Label>
                <img
                  src={formData?.imagePreview}
                  alt="image"
                  className="rounded-xl w-4/5 mx-auto border-2 border-black m-1"
                />
                <div
                  onClick={() => imageRef.current.click()}
                  className="m-2 cursor-pointer"
                >
                  <span
                    variant="outline"
                    className=" border border-gray-300 p-1 rounded-lg"
                  >
                    Upload Img
                    <i className="fa-solid fa-cloud-arrow-up m-1"></i>
                  </span>
                </div>
               
              </div>

              <div className="my-3">
                <input
                  type="file"
                  className="hidden"
                  ref={profileImgRef}
                  onChange={handleProfileImg}
                  id="profileImg"
                />
                <Label className={customStyl.labelStyl}>Profile Img</Label>
                <img
                  src={formData?.profileImgPrev}
                  alt="image"
                  className="rounded-xl w-3/5 mx-auto border-2 border-black m-1"
                />
                <div
                  onClick={() => profileImgRef.current.click()}
                  className="m-3 cursor-pointer"
                >
                  <span
                    variant="outline"
                    className=" border border-gray-300 p-1 rounded-lg"
                  >
                    Upload Img
                    <i className="fa-solid fa-cloud-arrow-up m-1"></i>
                  </span>
                </div>
                {/* <i
                  className="fa-solid fa-image text-lg cursor-pointer"
                  onClick={()=>imageRef.current.click()}
                ></i> */}
              </div>

              <div className="text-center w-full">
                <Button
                  className="w-3/4 rounded-xl m-2 px-12 bg-purple-600 hover:bg-purple-700"
                  type="submit"
                >
                  {!loading ? (
                    "Edit"
                  ) : (
                    <div className="flex gap-2 items-center">
                      Please wait
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default EditRecruiterProfile;
