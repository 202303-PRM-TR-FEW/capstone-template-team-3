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
        <CampaignEditModal campaignId={campaignId} lng={lng} />
      )}
      {deleteModalIsOpen && (
        <DeleteModal
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
        <div className="flex flex-col mx-auto p-3 items-center lg:pt-20 text-center lg:flex lg:flex-row lg:space-x-5 lg:items-start lg:mx-16 lg:justify-center lg:space-y-0">
          {/* left container */}
          <div className="mb-5 lg:flex items-center">
            <Image
              className="bg-slate-100 rounded-xl max-h-[600px] lg:w-[40rem] sm:h-[25rem] sm:w-[36rem] overflow-visible sm:max-h-[70vh] mx-auto lg:max-w-lg"
              width={1200}
              height={200}
              src={currentCampaign.image}
              alt={currentCampaign.projectName}
            />
          </div>
          {/* right container  */}
          <div className="flex flex-col w-full sm:w-[620px] sm:w-auto md:w-[750px] lg:w-1/2 lg:h-1/2">
            <h1 className="text-2xl font-bold lg:text-start ">
              {currentCampaign.projectName}
            </h1>
            <div className="flex items-center justify-center space-x-5 lg:justify-start">
              <div
                className="h-20 w-20 rounded-full border-2 border-neutral-950 overflow-hidden bg-theme relative z-0"
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
            <div className="flex flex-col w-full p-3 items-center text-center lg:flex-row lg:space-y-0">
              {/* about campaign  */}
              <div className="flex flex-col w-full lg:w-1/2 rounded-lg border-2 lg:border-l-0 p-5 lg:rounded-none border-neutral-950 my-5 lg:flex-grow overflow-hidden">
                <h4 className="text-xl">{t("About campaign")}</h4>
                <p className="text-sm">{currentCampaign.about}</p>
                {currentCampaign.category && (
                  <div>
                    <h5 className="text-md mb-2">{t("Categories")}</h5>
                    <div className="flex justify-center items-center gap-2 text-sm">
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
              {/* campaign details   */}
              <div className="flex flex-col w-full lg:w-1/2 lg:justify-between p-5 my-5 rounded-lg lg:border-r-0 lg:rounded-none text-center items-center border-2 border-neutral-950 lg:flex-grow">
                <div className="flex space-x-10 py-2">
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
            </div>
            <div className="flex justify-center items-center gap-5 lg:justify-end">
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
          <div className="flex flex-col w-full p-3 items-center lg:pt-20 text-center lg:flex lg:flex-row lg:space-x-5  lg:items-start lg:mx-16 lg:justify-center ">
            {/* left container */}
            <div className="mb-5 max-w-3xl">
              <Image
                className="bg-slate-100 rounded-xl max-h-[70vh] xl:max-w-xl"
                width={1200}
                height={200}
                src={currentCampaign.image}
                alt={currentCampaign.projectName}
              />
            </div>
            {/* right container  */}
            <div className="flex flex-col space-y-5 w-full">
              <h1 className="text-2xl font-bold lg:text-start ">
                {currentCampaign.projectName}
              </h1>
              <div className="flex items-center justify-center space-x-5 lg:justify-start">
                <div
                  className="h-20 w-20 rounded-full border-2 border-neutral-950 overflow-hidden bg-theme relative z-0"
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

              <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0">
                {/* about campaign  */}
                <div className="flex flex-col space-y-5 rounded-lg border-2 overflow-hidden  py-5 lg:border-l-0 lg:rounded-none border-neutral-950 ">
                  <h4 className="text-xl">{t("About campaign")}</h4>
                  {currentCampaign.category && (
                    <div>
                      <h5 className="text-md mb-2">{t("Categories")}</h5>
                      <div className="flex justify-center items-center gap-2 text-sm">
                        {currentCampaign.category.map((category) => (
                          <span
                            key={category.label}
                            className="p-2 border-2 border-black bg-theme text-black rounded-lg"
                          >
                            {category.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* campaign details   */}
                <div className="flex flex-col justify-around p-5 rounded-lg lg:border-r-0 lg:rounded-none text-center items-center border-2 space-y-3 border-neutral-950">
                  <div className="flex space-x-10 ">
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
              </div>
              <div className="flex justify-center lg:flex lg:justify-start">
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
