"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { BsFillSendCheckFill } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import "./CampaignEditModal.css";
import Button from "../Button/Button";
import { auth } from "../../../firebase/firebase";
import { useForm, Controller } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  updateCurrentCampaign,
  getCurrentCampaign,
} from "@/app/lib/features/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/app/lib/features/campaignEditSlice";
import { useTranslation } from "../../../i18n/client";
import Select from "react-select";
import { toast } from "react-toastify";

const CampaignEditModal = ({params, campaignId }) => {
  const { lng } = params;
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, "campaignEdit");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();
  const [uploadState, setUploadState] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const multiValueRemoveStyles = "text-theme bg-accent-black";
  const multiValueLabelStyles = "text-accent-black bg-theme";
  const currentCampaign = useSelector(
    (state) => state.campaign.currentCampaign
  );
  const currentUser = useSelector((state) => state.user.user);

  const style = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "16px",
      border: '1px solid black',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid black',
      },
      borderColor: state.isFocused ? 'black' : provided.borderColor,
    }),
    input: (provided, state) => ({
      ...provided,
      outline: state.isFocused ? 'none' : provided.outline,
    }),
  };

  const getCurrentCampaignData = async () => {
    await dispatch(getCurrentCampaign(campaignId));
  };

  useEffect(() => {
    if (!loading) {
      getCurrentCampaignData();
    }
  }, [loading]);

  const categoryOptions = [
    { label: t("Education"), value: "Education" },
    { label: t("Culture"), value: "Culture" },
    { label: t("Animals"), value: "Animals" },
    { label: t("Children"), value: "Children" },
  ];

  const labelTrTranslations = {
    "Education": "Eğitim",
    "Culture": "Kültür",
    "Animals": "Hayvanlar",
    "Children": "Çocuklar"
  };

  const labelEnTranslations = {
    "Eğitim": "Education",
    "Kültür": "Culture",
    "Hayvanlar": "Animals",
    "Çocuklar": "Children"
  };

  console.log(lng);

  const onSubmit = async (data) => {
    const { projectName, about, file, category } = data;
    const userId = user.uid;
    await dispatch(
      updateCurrentCampaign({
        projectName,
        about,
        file,
        category,
        userId,
        campaignId,
      })
    );
    await dispatch(closeModal());
    toast.success(t("Campaign updated."), {
      toastId: "edit-succeeded",
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadState(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedFileName("");
      setUploadState(true);
      setPreviewImage(null);
    }
  };

  const deleteFile = () => {
    setUploadedFileName(null);
    setUploadState(true);
    setValue("file", null);
  };

  const handleModalToggle = () => {
    dispatch(closeModal());
  };

  return (
    currentCampaign && (
      <main>
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-zinc-950 bg-opacity-50 modal-background z-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-50 xl:w-[60%] 2xl:w-[50%] rounded-xl p-4 flex flex-col justify-between w-11/12 sm:w-[80%] sm:h-[auto]"
          >
            <div>
              <div>
                <Button type="button" clickAction={handleModalToggle}>
                  <IoIosArrowBack size={28} />
                </Button>
              </div>
              <div className="lg:m-2 md:m-0 lg:my-4 md:my-1 lg:text-[38px] md:text-[20px] md:mx-4 text-[20px] leading-tight">
                {t("Edit")}
                <br /> {t("your campaign")}
              </div>
              <div className="flex flex-col md:flex-row justify-between md:m-2 my-2">
                <div className="flex flex-col gap-3 md:w-1/2 md:pe-5">
                  <div className="flex flex-col">
                    <label className="font-mulish text-lg md:text-[18px]">
                      {t("Name of your campaign")}
                    </label>
                    <input
                      {...register("projectName", {
                        required: true,
                        pattern:
                          /^(?=.*[a-zA-ZçÇşŞğĞüÜıİöÖ])[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*(?:\s[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*)*$/,
                      })}
                      defaultValue={currentCampaign.projectName}
                      className="title-input text-[20px] bg-slate-50 py-0 input-field focus:outline-none focus:ring-0 project-name-input w-full"
                    />
                    {errors.projectName?.type === "required" && (
                      <p
                        role="alert"
                        className="text-end text-red-600 italic text-[14px]"
                      >
                        {t("Campaign name is required")}
                      </p>
                    )}
                    {errors.projectName?.type === "pattern" && (
                      <p
                        role="alert"
                        className="text-end text-red-600 italic text-[14px]"
                      >
                        {t("Campaign name is invalid")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col lg:my-10">
                    <label className="font-mulish text-[15px] lg:text-[18px]">
                      {t("Select categories for your campaign")}
                    </label>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={categoryOptions}
                          isMulti
                          onChange={(value) => field.onChange(value)}
                          onBlur={() => field.onBlur()}
                          placeholder={t("Education") + ", " + t("Culture")}
                          isSearchable
                          noOptionsMessage={() => {
                            t("No category found...");
                          }}
                          defaultValue={
                            currentCampaign && currentCampaign.category
                            && currentCampaign.category.map(category => {
                              let translatedLabel = category.label;
                              if (lng === "tr" && labelTrTranslations[category.label]) {
                                translatedLabel = labelTrTranslations[category.label];
                              } else if (lng === "en" && labelEnTranslations[category.label]) {
                                translatedLabel = labelEnTranslations[category.label];
                              }
                              return {
                                label: translatedLabel,
                                value: category.value
                              };
                            })
                          }
                          classNames={{
                            multiValueRemove: () => multiValueRemoveStyles,
                            multiValueLabel: () => multiValueLabelStyles,
                          }}
                          styles={style}
                        />
                      )}
                    />
                    {errors.category?.type === "required" && (
                      <p
                        role="alert"
                        className="text-end text-red-600 italic text-[14px]"
                      >
                        {t("Category is required")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-accent-black border border-accent-black w-[1px] rounded h-auto hidden md:block"></div>
                <div className="md:ps-5 md:w-1/2 flex flex-col">
                  <div className="flex flex-col max-md:mt-4">
                    <label className="font-mulish text-lg md:text-[18px]">
                      {t("About your campaign")}
                    </label>
                    <input
                      {...register("about", {
                        required: true,
                        pattern:
                          /^(?=.*[a-zA-ZçÇşŞğĞüÜıİöÖ])[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*(?:\s[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*)*$/,
                      })}
                      placeholder={t(
                        "So many cats, so little homes. We want to provide home and care to them all. Help us build a dream shelter for all cats in our town."
                      )}
                      className="title-input text-[20px] bg-slate-50 input-field focus:outline-none focus:ring-0 w-full"
                      defaultValue={currentCampaign.about}
                    />
                    {errors.about?.type === "required" && (
                      <p
                        role="alert"
                        className="text-end text-red-600 italic text-[14px]"
                      >
                        {t("About is required")}
                      </p>
                    )}
                    {errors.about?.type === "pattern" && (
                      <p
                        role="alert"
                        className="text-end text-red-600 italic text-[14px]"
                      >
                        {t("About is invalid")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center lg:my-10 md:my-1 max-md:mt-4 md:mt-4">
                    <input
                      {...register("file", { required: true })}
                      type="file"
                      className="hidden"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onInput={handleFileChange}
                    />
                    {uploadState ? (
                      <>
                        <span className="text-black px-4 text-[18px]">
                          {t("Add media")}
                        </span>
                        <span className="text-black pb-4 text-[12px]">
                          (.jpg/.jpeg/.png)
                        </span>
                        <label
                          htmlFor="file-input"
                          className="flex justify-center"
                        >
                          <FaUpload
                            className="border-[1px] border-black rounded-lg p-3 cursor-pointer"
                            size={40}
                          />
                        </label>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-2 justify-center items-center">
                          <span className="text-black text-[15px] text-center mb-1">
                            {t("File ready to be uploaded")}
                          </span>
                          <BsFillSendCheckFill
                            title={uploadedFileName}
                            size={26}
                            className="mb-2"
                          />
                        </div>
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="h-1/2 w-1/2 mb-1"
                            title={uploadedFileName}
                          />
                        )}
                        <div className="flex gap-2 justify-center items-center">
                          <span className="text-[15px] ">
                            {uploadedFileName.substring(0, 8).split(".")[0] +
                              uploadedFileName.slice(-4)}
                          </span>
                          <TiDeleteOutline onClick={deleteFile} size={30} />
                        </div>
                      </>
                    )}
                    {errors.file?.type === "required" && (
                      <p
                        role="alert"
                        className="text-end text-red-600 italic text-[14px]"
                      >
                        {t("Media is required")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end lg:mt-5 md:mt-auto">
              <Button
                type="submit"
                style="bg-zinc-950 rounded-md w-full p-2 text-white text-[15px]"
              >
                {t("Update campaign")}
              </Button>
            </div>
          </form>
        </div>
      </main>
    )
  );
};

export default CampaignEditModal;
