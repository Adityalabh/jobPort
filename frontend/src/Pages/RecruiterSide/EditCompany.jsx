import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/myComponent/Navbar";
import { getCurrCompany, getRefreshCurrComp } from "@/redux/compnaySlice";
import { ImgFileReader } from "@/utils/ImgFileReader";
import { data } from "autoprefixer";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCompany = () => {
  const customStyl = {
    label: "font-semibold text-xl my-2",
    inp: "my-2 p-2 text-base",
  };
  const param = useParams();
  const compId = param.id;
  const dispatch = useDispatch();
  const { company, refreshCurrCompany } = useSelector((store) => store.company);

  const { currCompany } = useSelector((store) => store.company);

  const [compData, setCompData] = useState({
    companyName: "",
    location: "",
    description: "",
    website: "",
    logoPreview: "",
  });

  useEffect(() => {
    axios.get(`/company/profile/${compId}`).then((res) => {
      dispatch(getCurrCompany(res.data));
      setCompData({ ...compData, companyName: company.companyName });
    });
  }, [compId]);

  useEffect(() => {
    if (currCompany) {
      setCompData({
        companyName: currCompany.companyName || "",
        location: currCompany.location || "",
        description: currCompany.description || "",
        website: currCompany.website || "",
        logoPreview: currCompany.logo || "",
      });
      setLogo(currCompany.logo || "");
    }
  }, [currCompany]);

  const navigate = useNavigate();
  const [logo, setLogo] = useState(currCompany.logo || "");
  const [loading, setLoading] = useState(false);

  const handleInp = (e) => {
    setCompData({ ...compData, [e.target.id]: e.target.value });
  };
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const dataurl = await ImgFileReader(file);
      setCompData({ ...compData, logoPreview: dataurl });
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const sendFormData = new FormData();
    sendFormData.append("companyName", compData.companyName);
    sendFormData.append("location", compData.location);
    sendFormData.append("description", compData.description);
    sendFormData.append("website", compData.website);
    if (logo) {
      sendFormData.append("logo", logo);
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `/company/edit/${currCompany._id}`,
        sendFormData
      );
      toast.success(res.data.message);
      // console.log(res.data);
      dispatch(getRefreshCurrComp());
      navigate("/");
    } catch (error) {
      console.log(error);
      toast(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="sticky top-0 shadow-md bg-white">
        <Navbar />
      </div>
      <div>
        <form onSubmit={handleForm}>
          <div className="min-h-screen bg-gray-100 pt-7">
            <div className="w-5/6 mx-auto ">
              <h1 className="text-2xl font-bold text-center">Edit Company</h1>
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
              <Input
                placeholder="website link"
                className={customStyl.inp}
                id="website"
                value={compData.website}
                onChange={handleInp}
              />

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
              <Button className="w-full my-3" type="submit">
                {!loading ? (
                  'Edit'
                ) : (
                  <div className="flex gap-2">
                    Please wait <Loader2 />
                  </div>
                )
                
                }
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
