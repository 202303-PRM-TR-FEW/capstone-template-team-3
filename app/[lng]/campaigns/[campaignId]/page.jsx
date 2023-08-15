"use client";

import Button from "@/app/[lng]/components/Button/Button";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useTranslation } from "../../../i18n/client";
import { useEffect, useState } from "react";
import DonationBar from "@/app/[lng]/components/DonationBar/DonationBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/app/lib/features/paymentModalSlice";
import { openModal as openEditModal } from "@/app/lib/features/campaignEditSlice";
import PaymentModal from "@/app/[lng]/components/PaymentModal/PaymentModal";
import { getCurrentCampaign } from "@/app/lib/features/campaignSlice";
import CampaignEditModal from "../../components/CampaignEditModal/CampaignEditModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { getCampaignOwnerData } from "@/app/lib/features/userSlice";
import Loader from "../../components/Loader/loader";

export default function CampaignPage({ params }) {
  const [user, loading] = useAuthState(auth);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const { campaignId, lng } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.paymentModal.isOpen);
  const editModalIsOpen = useSelector(
    (state) => state.campaignEditModal.isOpen
  );
  const currentCampaign = useSelector(
    (state) => state.campaign.currentCampaign
  );
  const userStatus = useSelector((state) => state.user.status);
  const campaignStatus = useSelector((state) => state.campaign.status);
  const campaignOwner = useSelector((state) => state.user.campaignOwner);

  const { t } = useTranslation(lng, "campaignId");

  const getCampaignData = async () => {
    const currentCampaign = await dispatch(getCurrentCampaign(campaignId));
    const currentCampaignId = currentCampaign.payload.id;
    if (currentCampaignId) {
      await dispatch(getCampaignOwnerData(currentCampaignId));
    }
  };

  const categoryTranslations = {
    "Education": "Eğitim",
    "Culture": "Kültür",
    "Animals": "Hayvanlar",
    "Children": "Çocuklar"
  };

  useEffect(() => {
    getCampaignData();
  }, [campaignId, modalIsOpen, editModalIsOpen]);

  const handleModalToggle = () => {
    if (!user) {
      router.push(`/${lng}/sign-in`);
    }
    if (user) {
      dispatch(openModal());
    }
  };

  const handleEditModalToggle = () => {
    dispatch(openEditModal());
  };

  const handleCancelCampaign = () => {
    setDeleteModalIsOpen((prevState) => !prevState);
  };

  const calculateLeftDays = () => {
    if (currentCampaign && typeof currentCampaign.endDate === "object") {
      const endDate = currentCampaign.endDate.toDate();
      const today = new Date();
      const leftDays = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
      return leftDays;
    } else if (currentCampaign && typeof currentCampaign.endDate === "string") {
      const [day, month, year] = currentCampaign.endDate.split("/");
      const endDate = new Date(`${"20" + year}`, month - 1, day);
      const today = new Date();
      const leftDays = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
      return leftDays;
    }
  };

  const leftDays = calculateLeftDays();

  return (
    // main container
    <>
      {modalIsOpen && <PaymentModal campaignId={campaignId} />}
      {editModalIsOpen && (
        <CampaignEditModal campaignId={campaignId} params={params} />
      )}
      {deleteModalIsOpen && (
        <DeleteModal
          params={params}
          campaignId={campaignId}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
        />
      )}
      {userStatus === "loading" || campaignStatus === "loading" ? (
        <Loader />
      ) : currentCampaign &&
        user &&
        currentCampaign.id === user.uid &&
        campaignOwner ? (
        <div className="xl:h-screen py-10 flex items-center flex-col xl:flex-row justify-center container mx-auto px-5 gap-5">
          {/* left container */}
          <div className="w-[16rem] h-44 sm:w-[36rem] sm:h-[25rem] lg:w-[50rem] lg:h-[30rem] xl:w-1/2 xl:h-1/2 relative flex justify-center items-center rounded-lg overflow-visible bg-[#e6e6e6]">
            <Image
              className="bg-slate-100 absolute w-[96%] h-[95%] rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
              width={1200}
              height={200}
              src={currentCampaign.image}
              alt={currentCampaign.projectName}
            />
          </div>
          {/* right container  */}
          <div className="flex flex-col space-y-5 lg:w-1/2">
            <h1 className="text-xl lg:text-4xl font-bold text-center container w-11/12 mx-auto">
              {currentCampaign.projectName}
            </h1>
            <div className="flex w-11/12 mx-auto lg:w-full items-center justify-center space-x-2 lg:space-x-5">
              <div
                className="h-16 w-16 lg:h-20 lg:w-20 rounded-full border-2 border-neutral-950 overflow-hidden bg-theme relative z-0"
                onClick={() => router.push(`/${lng}/profile`)}
              >
                <Image
                  className="rounded-full"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt={campaignOwner.name}
                  src={
                    campaignOwner.photo
                      ? campaignOwner.photo
                      : "/assets/images/empty-user.png"
                  }
                />
              </div>
              <h3>{campaignOwner.name}</h3>
            </div>
            <div className="flex flex-col space-y-5 lg:space-y-0">
              {/* about campaign  */}
              <div className="flex flex-col space-y-5 justify-center items-center rounded-lg border-2 lg:border-l-0 lg:border-r-0 lg:border-b-0 p-5 lg:rounded-none border-neutral-950 text-center w-11/12 mx-auto lg:w-full">
                <h4 className="text-lg lg:text-xl">{t("About campaign")}</h4>
                <p className="text-sm">{currentCampaign.about}</p>
                {currentCampaign.category && (
                  <div>
                    <h5 className="text-md mb-5">{t("Categories")}</h5>
                    <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
                      {currentCampaign.category.map((category) => (
                        <span
                          key={category.label}
                          className="p-2 border-2 border-black bg-theme text-black rounded-lg"
                        >
                          {lng === "tr" ? categoryTranslations[category.value] : category.value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-5 rounded-lg lg:border-r-0 lg:border-l-0 lg:border-t-0 lg:rounded-none text-center items-center border-2 space-y-3 border-neutral-950 w-11/12 lg:w-full mx-auto">
                <div className="flex lg:space-x-10 justify-center items-center">
                  <div className="p-2">
                    <h5>{t("Raised")}:</h5>
                    <p>{"$" + currentCampaign.raised}</p>
                  </div>
                  <div className="bg-theme rounded-lg p-2">
                    <h5>{t("Goal")}:</h5>
                    <p>{"$" + currentCampaign.goal}</p>
                  </div>
                </div>
                <DonationBar
                  raised={currentCampaign.raised}
                  goal={currentCampaign.goal}
                />
                <div>
                  <h5 className="flex items-center space-x-2">
                    <FaRegCalendarDays />
                    <p>
                      {leftDays > 0
                        ? leftDays + " " + t("days left") + "."
                        : t("Campaign is over")}
                    </p>
                  </h5>
                </div>
              </div>
              {/* campaign details   */}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Button
                style={
                  "w-[15rem] bg-neutral-950 text-white py-3 px-8 rounded-lg"
                }
                name={t("Edit")}
                clickAction={handleEditModalToggle}
              />
              <Button
                style={
                  "w-[15rem] bg-neutral-950 text-white py-3 px-8 rounded-lg"
                }
                name={t("Cancel")}
                clickAction={handleCancelCampaign}
              />
            </div>
          </div>
        </div>
      ) : (
        currentCampaign &&
        campaignOwner && (
          <div className="xl:h-screen py-10 flex items-center flex-col xl:flex-row justify-center container mx-auto px-5 gap-5">
            {/* left container */}
            <div className="w-[16rem] h-44 sm:w-[36rem] sm:h-[25rem] lg:w-[50rem] lg:h-[30rem] xl:w-1/2 xl:h-1/2 relative flex justify-center items-center rounded-lg overflow-visible bg-[#e6e6e6]">
              <Image
                className="bg-slate-100 absolute w-[96%] h-[95%] rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
                width={1200}
                height={200}
                src={currentCampaign.image}
                alt={currentCampaign.projectName}
              />
            </div>
            {/* right container  */}
            <div className="flex flex-col space-y-5 lg:w-1/2">
              <h1 className="text-xl lg:text-4xl font-bold text-center container w-11/12 mx-auto">
                {currentCampaign.projectName}
              </h1>
              <div className="flex w-11/12 mx-auto lg:w-full items-center justify-center space-x-2 lg:space-x-5">
                <div
                  className="h-16 w-16 lg:h-20 lg:w-20 rounded-full border-2 border-neutral-950 overflow-hidden bg-theme relative z-0"
                  onClick={() =>
                    router.push(
                      `/${lng}/campaigns/${campaignId}/${campaignOwner.id}`
                    )
                  }
                >
                  <Image
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={campaignOwner.name}
                    src={
                      campaignOwner.photo
                        ? campaignOwner.photo
                        : "/assets/images/empty-user.png"
                    }
                  />
                </div>
                <h3>{campaignOwner.name}</h3>
              </div>

              <div className="flex flex-col space-y-5 lg:space-y-0">
                {/* about campaign  */}
                <div className="flex flex-col space-y-5 justify-center items-center rounded-lg border-2 lg:border-l-0 lg:border-r-0 lg:border-b-0 p-5 lg:rounded-none border-neutral-950 text-center w-11/12 mx-auto lg:w-full">
                  <h4 className="text-lg lg:text-xl">{t("About campaign")}</h4>
                  <p className="text-sm">{currentCampaign.about}</p>
                  {currentCampaign.category && (
                    <div>
                      <h5 className="text-md mb-5">{t("Categories")}</h5>
                      <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
                        {currentCampaign.category.map((category) => (
                          <span
                            key={category.label}
                            className="p-2 border-2 border-black bg-theme text-black rounded-lg"
                          >
                            {lng === "tr" ? categoryTranslations[category.value] : category.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-5 rounded-lg lg:border-r-0 lg:border-l-0 lg:border-t-0 lg:rounded-none text-center items-center border-2 space-y-3 border-neutral-950 w-11/12 lg:w-full mx-auto">
                  <div className="flex lg:space-x-10 justify-center items-center">
                    <div className="p-2">
                      <h5>{t("Raised")}:</h5>
                      <p>{"$" + currentCampaign.raised}</p>
                    </div>
                    <div className="bg-theme rounded-lg p-2">
                      <h5>{t("Goal")}:</h5>
                      <p>{"$" + currentCampaign.goal}</p>
                    </div>
                  </div>
                  <DonationBar
                    raised={currentCampaign.raised}
                    goal={currentCampaign.goal}
                  />
                  <div>
                    <h5 className="flex items-center space-x-2">
                      <FaRegCalendarDays />
                      <p>
                        {leftDays > 0
                          ? leftDays + " " + t("days left") + "."
                          : t("Campaign is over")}
                      </p>
                    </h5>
                  </div>
                </div>
                {/* campaign details   */}
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Button
                  style={"bg-neutral-950 text-white  py-3 px-16  rounded-lg"}
                  name={t("Fund this campaign!")}
                  clickAction={handleModalToggle}
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
