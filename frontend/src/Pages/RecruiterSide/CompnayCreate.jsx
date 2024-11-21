import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/myComponent/Navbar";
import { getCompany } from "@/redux/compnaySlice";
import { ImgFileReader } from "@/utils/ImgFileReader";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompnayCreate = () => {
  const customStyl = {
    label: "font-semibold text-xl my-2",
    inp: "my-2 p-2 text-base",
  };
  const [compData, setCompData] = useState({
    companyName: "",
    location: "",
    description: "",
    logoPreview: "",
    website:""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const dispatch = useDispatch();

  const handleInp = (e) => {
    setCompData({ ...compData, [e.target.id]: e.target.value });
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    // console.log("logo1",logo);
    // console.log("file", file);
    if (file) {
      setLogo(file);
      // console.log("logo", logo);
      const dataUrl = await ImgFileReader(file);
      setCompData({ ...compData, logoPreview: dataUrl });
      //   console.log(file,dataUrl);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendFormdata = new FormData();
      sendFormdata.append("companyName", compData.companyName);
      sendFormdata.append("location", compData.location);
      sendFormdata.append("description", compData.description);
      if (logo) {
        sendFormdata.append("logo", logo);
      }
      const res = await axios.post("/company/register", sendFormdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res.data.message);
      toast.success(res.data.message);
      dispatch(getCompany(res.data.newCompany));
      setCompData({
        companyName: "",
        location: "",
        description: "",
        logoPreview: "",
      });
      setLogo("");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
    // console.log(compData);
  };

  return (
    <div>
      <div className="sticky top-0 bg-white shadow-md">
        <Navbar />
      </div>
      <form onSubmit={handleForm}>
        <div className="min-h-screen bg-gray-100 pt-7">
          <div className="w-5/6 mx-auto ">
            <h1 className="text-2xl font-bold text-center">Register Company</h1>
            <label htmlFor="" className={customStyl.label}>
              Company Name
            </label>
            <Input
              placeholder="Enter unique company name"
              required
              className={customStyl.inp}
              id="companyName"
              value={compData.companyName}
              onChange={handleInp}
            />
            <div className="flex flex-col my-2">
              <label htmlFor="" className={customStyl.label}>
                Description
              </label>
              <textarea
                placeholder="Enter details about your company"
                required
                id="description"
                className={customStyl.inp}
                value={compData.description}
                onChange={handleInp}
              ></textarea>
            </div>
            <label htmlFor="" className={customStyl.label}>
              Location
            </label>
            <Input
              placeholder="Enter company location"
              required
              id="location"
              className={customStyl.inp}
              value={compData.location}
              onChange={handleInp}
            />
            <label htmlFor="" className={customStyl.label}>
              Website
            </label>
            <Input placeholder="website link" className={customStyl.inp} id="website"  value={compData.website}
              onChange={handleInp}/>
            <label htmlFor="" className={customStyl.label}>
              Logo
            </label>
            <Input
              placeholder="Enter unique company name"
              className={customStyl.inp}
              type="file"
              id="logo"
              accept="image*/"
              onChange={handleFile}
            />
            {compData.logoPreview && (
              <div className="w-full">
                <img
                  src={compData?.logoPreview}
                  alt="Logo"
                  className="flex justify-center w-40 h-40 mx-auto rounded-md border-2 border-gray-700"
                />
              </div>
            )}

            {loading === false ? (
              <Button className="w-full my-3" type="submit">
                Register
              </Button>
            ) : (
              <div>
                <Button className="w-full my-3">
                  Please wait
                  <Loader2 />
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompnayCreate;
