"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { useEffect, useState } from "react";
import { getUserData } from "app/lib/features/userSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../i18n/client";
import { useForm } from "react-hook-form";
import {
  getAllUserCampaigns,
  getAllUserDonations,
} from "../../lib/features/campaignSlice";
import { userJoinNewsletter, userUpdatePhoto, userDeletePhoto } from "@/app/lib/features/userSlice";
import { useRouter } from "next/navigation";
import { BsPatchCheckFill } from "react-icons/bs"
import Button from "../components/Button/Button";
import { openModal } from "@/app/lib/features/kickOffModalSlice";
import { BsFillSendCheckFill } from 'react-icons/bs'
import { FaUpload } from "react-icons/fa";
import { MdAddAPhoto } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { TiDeleteOutline } from 'react-icons/ti'

const Profile = ({ lng }) => {
  const [user, loading] = useAuthState(auth);
  const [editProfileImage, setEditProfileImage] = useState(false)
  const [uploadState, setUploadState] = useState(true)
  const [uploadedFileName, setUploadedFileName] = useState(null)
  const dispatch = useDispatch();
  const router = useRouter()
  const currentUser = useSelector((state) => state.user.user);
  const { t } = useTranslation(lng, "profile");
  const userCampaigns = useSelector((state) => state.campaign.userCampaigns);
  const userDonations = useSelector((state) => state.campaign.userDonations);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm();

  const getUserCampaigns = async () => {
    if (user && !loading) {
      const userId = user.uid;
      dispatch(getAllUserCampaigns(userId));
    }
  };

  const getUserDonations = async () => {
    if (user && !loading) {
      const userId = user.uid;
      dispatch(getAllUserDonations(userId));
    }
  };

  const getCurrentUserData = async () => {
    if (user && !loading) {
      const userId = user.uid;
      await dispatch(getUserData(userId));
    }
  };

  const handleRoute = () => {
    router.push("/my-campaigns")
  }

  const handleNewCampaign = () => {
    router.push("/my-campaigns");
    dispatch(openModal());
  }

  const handleSupport = () => {
    router.push("/campaigns")
  }

  const handleNewsletter = async () => {
    if (user && !loading) {
      const userId = user.uid
      await dispatch(userJoinNewsletter(userId))
      await dispatch(getUserData(userId))
    }
  }

  const handleEditProfileImage = async () => {
    setEditProfileImage((prevState) => !prevState)
  }

  const handleFileChange = (event) => {
    setUploadedFileName(event.target.files[0].name)

    if (event.target.files && event.target.files.length > 0) {
      setUploadState(false);
    } else {
      setUploadState(true);
    }
  };

  const deleteFile = () => {
    setUploadedFileName(null)
    setUploadState(true)
    setValue('file', null);
  }

  const handleDeleteProfileImage = async () => {
    if (user && !loading) {
      const userId = user.uid;
      await dispatch(userDeletePhoto(userId));
      await dispatch(getUserData(userId))
      setEditProfileImage(false)
      setUploadState(true)
      setUploadedFileName(null)
    }
  }

  const onSubmit = async (data) => {
    const { file } = data
    console.log(file)
    const userId = user.uid;
    const currentUserName = currentUser.name;
    await dispatch(userUpdatePhoto({ userId, currentUserName, file }))
    await dispatch(getUserData(userId))
    setEditProfileImage(false)
    setUploadState(true)
    setUploadedFileName(null)
  }

  useEffect(() => {
    if (!loading) {
      getCurrentUserData();
      getUserCampaigns();
      getUserDonations();
    }
  }, [loading]);

  return (
    user &&
    currentUser && (
      <main>
        <div className="container px-4 mx-auto">
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg my-10">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className={`${editProfileImage ? "mt-10 mb-4 relative" : "mt-10 mb-10 relative"}`}>
                    <img alt="..." src={`${currentUser.photo ? currentUser.photo : "/assets/images/empty-user.png"}`} className="bg-theme shadow-xl rounded-full h-40 w-40 align-middle border-4 border-theme" />
                    <MdAddAPhoto className="absolute bottom-0 right-0 cursor-pointer text-accent-black" size={20}
                      onClick={handleEditProfileImage}
                    />
                  </div>
                </div>
              </div>
              {editProfileImage &&
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-center mb-4">
                    <input
                      {...register("file")}
                      type="file"
                      className="hidden"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onInput={handleFileChange}
                    />
                    {uploadState ? (
                      <div className="flex justify-center items-center gap-5">
                        <div>
                          <span className="text-black pb-4 text-[14px]">Upload Image</span>
                          <label htmlFor="file-input" className="flex justify-center">
                            <FaUpload className="border-[1px] border-black rounded-lg p-3 cursor-pointer" size={40} />
                          </label>
                        </div>
                        <div>
                          <span className="text-black pb-4 text-[14px]">Delete Image</span>
                          <div className="flex justify-center" onClick={handleDeleteProfileImage}>
                            <RxCross1 className="border-[1px] border-black rounded-lg p-3 cursor-pointer" size={40} />
                          </div>
                        </div>
                      </div>) : (
                      <>
                        <div className="flex justify-center items-center">
                          <span className="text-black px-4 text-[14px] text-center">Image ready to be uploaded</span>
                          <BsFillSendCheckFill title={uploadedFileName} size={30} className='m-1' />
                        </div>
                        <div className="flex justify-center items-center">
                          <span className="text-black px-4 text-[14px] text-center">{uploadedFileName.substring(0, 10).split('.')[0] + uploadedFileName.slice(-4)}</span>
                          <TiDeleteOutline onClick={deleteFile} size={30} />
                        </div>
                        <Button type="submit"
                          name={"Upload"}
                          style="bg-theme px-2 py-3 xl:my-4 text-[#0a0a0a] xl:text-sm text-[14px] w-5/6 mx-auto rounded-lg mt-0 mb-5 md:mb-0 md:text-[14px] lg:text-[22px] md:w-1/6 lg:w-1/3 xl:w-1/6 md:h-[6.5rem] lg:h-[7rem] xl:h-auto md:me-4 xl:mx-auto md:rounded-l-3xl md:rounded-r-sm xl:rounded-lg break-words hover:bg-accent-black hover:text-theme cursor-pointer"
                        />
                      </>)
                    }
                  </div>
                </form>}
              <div className="text-center">
                <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {currentUser.name}
                </h3>
                {/* <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Los Angeles, California
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div> */}
              </div>
              <div className="flex justify-center w-full px-4 text-center border-t border-blueGray-200 mt-10 py-10">
                <div className="w-1/3 mx-auto">
                  <h2>Kick-Off</h2>
                  <Button
                    type={"button"}
                    style="bg-theme px-2 py-3 xl:my-4 text-[#0a0a0a] xl:text-[18px] text-[14px] w-5/6 mx-auto rounded-lg mt-0 mb-5 md:mb-0 md:text-[14px] lg:text-[22px] md:w-1/6 lg:w-1/3 xl:w-5/6 md:h-[6.5rem] lg:h-[7rem] xl:h-[5rem] md:me-4 xl:mx-auto md:rounded-l-3xl md:rounded-r-sm xl:rounded-lg break-words hover:bg-accent-black hover:text-theme cursor-pointer"
                    name={t("New campaign")}
                    clickAction={handleNewCampaign}
                  />
                </div>
                <div className="w-1/3 mx-auto">
                  <h2>Campaigns</h2>
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-2 p-3 h-20 text-center bg-theme rounded-lg hover:bg-accent-black hover:text-theme cursor-pointer" onClick={handleRoute}>
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {userCampaigns.length}
                      </span>
                      <span className="text-sm text-blueGray-400">Kicked-Off</span>
                    </div>
                    <div className="ml-2 p-3 h-20 text-center bg-theme rounded-lg hover:bg-accent-black hover:text-theme cursor-pointer" onClick={handleRoute}>
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {userDonations.length}
                      </span>
                      <span className="text-sm text-blueGray-400">Supported</span>
                    </div>
                  </div>
                </div>
                <div className="w-1/3 mx-auto">
                  <h2>Support</h2>
                  <Button
                    type={"button"}
                    style="bg-theme px-2 py-3 xl:my-4 text-[#0a0a0a] xl:text-[18px] text-[14px] w-5/6 mx-auto rounded-lg mt-0 mb-5 md:mb-0 md:text-[14px] lg:text-[22px] md:w-1/6 lg:w-1/3 xl:w-5/6 md:h-[6.5rem] lg:h-[7rem] xl:h-[5rem] md:me-4 xl:mx-auto md:rounded-l-3xl md:rounded-r-sm xl:rounded-lg break-words hover:bg-accent-black hover:text-theme cursor-pointer"
                    name={t("Other campaigns")}
                    clickAction={handleSupport}
                  />
                </div>
              </div>
              <div className="py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <h3 className="pb-4">Newsletter</h3>
                    <div className="flex justify-center">
                      {currentUser && currentUser.joinedNewsletter ?
                        <BsPatchCheckFill size={50} className="text-theme my-4" />
                        : <Button
                          type={"button"}
                          style="bg-theme px-2 py-3 xl:my-4 text-[#0a0a0a] xl:text-[18px] text-[14px] w-5/6 mx-auto rounded-lg mt-0 mb-5 md:mb-0 md:text-[14px] lg:text-[22px] md:w-1/6 lg:w-1/3 xl:w-1/4 md:h-[6.5rem] lg:h-[7rem] xl:h-auto md:me-4 xl:mx-auto md:rounded-l-3xl md:rounded-r-sm xl:rounded-lg break-words"
                          name={t("Join")}
                          clickAction={handleNewsletter}
                        />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default Profile;
