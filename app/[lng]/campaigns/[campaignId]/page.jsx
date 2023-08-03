"use client";

import Button from "@/app/[lng]/components/Button/Button";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import { useTranslation } from "../../../i18n/client";
import { useEffect } from "react";
import DonationBar from "@/app/[lng]/components/DonationBar/DonationBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/app/lib/features/paymentModalSlice";
import PaymentModal from "@/app/[lng]/components/PaymentModal/PaymentModal";
import { getCurrentCampaign } from "@/app/lib/features/campaignSlice";
import { current } from "@reduxjs/toolkit";

export default function CampaignPage({ params }) {
  const [user, loading] = useAuthState(auth);
  const { campaignId, lng } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.paymentModal.isOpen);
  const currentCampaign = useSelector(
    (state) => state.campaign.currentCampaign
  );
  const campaignStatus = useSelector((state) => state.campaign.status);

  const { t } = useTranslation(lng, "campaignId");
  console.log(params)

  const getCampaign = async () => {
    dispatch(getCurrentCampaign(campaignId));
  };

  useEffect(() => {
    getCampaign();
  }, [campaignId, modalIsOpen]);

  const handleModalToggle = () => {
    if (!user) {
      router.push("/sign-in");
    }
    if (user) {
      dispatch(openModal());
    }
  };
  console.log(currentCampaign);
  console.log(lng);


  const calculateLeftDays = () => {
    if (typeof currentCampaign.endDate === "object") {
      const endDate = currentCampaign.endDate.toDate();
      const today = new Date();
      const leftDays = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
      return leftDays;
    } else if (typeof currentCampaign.endDate === "string") {
      const [day, month, year] = currentCampaign.endDate.split("/");
      const endDate = new Date(`${"20" + year}`, month - 1, day);
      console.log(currentCampaign.endDate);
      console.log(endDate);
      const today = new Date();
      const leftDays = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
      return leftDays;
    }
  };

  const leftDays = calculateLeftDays();

  console.log(typeof currentCampaign.endDate);

  return (
    // main container
    <>
      {modalIsOpen && <PaymentModal campaignId={campaignId} />}
      {campaignStatus === "loading" ? (
        <div className="flex flex-col p-3 items-center lg:pt-20 text-center lg:flex lg:flex-row lg:space-x-5  lg:items-start lg:mx-16 lg:justify-center ">
          {/* left container */}
          <div className="mb-5 max-w-3xl">
            <Image
              className="bg-slate-100 rounded-xl"
              width={1200}
              height={200}
              src="/assets/images/mockup.png"
              alt="asd"
            />
          </div>
          {/* right container  */}
          <div className="flex flex-col space-y-5 ">
            <h1 className="text-2xl font-bold lg:text-start ">Loading...</h1>
            <div className="flex items-center justify-center space-x-5 lg:justify-start">
              <Image
                className="rounded-full border-2 border-neutral-950"
                alt="asd"
                src="/assets/images/mockup.png"
                width={50}
                height={50}
              />
              <h3>Loading...</h3>
            </div>

            <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0">
              {/* about campaign  */}
              <div className="flex flex-col space-y-5  rounded-lg border-2 lg:border-l-0 py-5 lg:rounded-none border-neutral-950 ">
                <h4 className="text-xl">{t("About campaign")}</h4>
                <p className="text-sm">Loading...</p>
              </div>
              {/* campaign details   */}
              <div className="flex flex-col justify-around py-5 rounded-lg lg:border-r-0 lg:rounded-none text-center items-center border-2 space-y-3 border-neutral-950">
                <div className="flex space-x-10 ">
                  <div className="p-2">
                    <h5>{t("Raised")}:</h5>
                    <p>{"$" + "Loading..."}</p>
                  </div>
                  <div className="bg-theme rounded-lg p-2">
                    <h5>{t("Goal")}:</h5>
                    <p>{"$" + "Loading..."}</p>
                  </div>
                </div>
                <div>
                  <h5 className="flex items-center">
                    <FaRegCalendarDays /> {"Loading..."}
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
      ) : (
        currentCampaign && (
          <div className="flex flex-col p-3 items-center lg:pt-20 text-center lg:flex lg:flex-row lg:space-x-5  lg:items-start lg:mx-16 lg:justify-center ">
            {/* left container */}
            <div className="mb-5 max-w-3xl">
              <Image
                className="bg-slate-100 rounded-xl"
                width={1200}
                height={200}
                src={currentCampaign.image}
                alt={currentCampaign.projectName}
              />
            </div>
            {/* right container  */}
            <div className="flex flex-col space-y-5 ">
              <h1 className="text-2xl font-bold lg:text-start ">
                {currentCampaign.projectName}
              </h1>
              <div className="flex items-center justify-center space-x-5 lg:justify-start">
                <Image
                  className="rounded-full border-2 border-neutral-950"
                  alt={currentCampaign.organizer}
                  src={currentCampaign.image}
                  width={50}
                  height={50}
                />
                <h3>
                  {currentCampaign.organizer ? (
                    currentCampaign.organizer
                  ) : (
                    <>{t("Organizer")}</>
                  )}
                </h3>
              </div>

              <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0">
                {/* about campaign  */}
                <div className="flex flex-col space-y-5  rounded-lg border-2 lg:border-l-0 py-5 lg:rounded-none border-neutral-950 ">
                  <h4 className="text-xl">{t("About campaign")}</h4>
                  <p className="text-sm">{currentCampaign.about}</p>
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
                          ? leftDays + " days left"
                          : "Campaign is over"}
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
