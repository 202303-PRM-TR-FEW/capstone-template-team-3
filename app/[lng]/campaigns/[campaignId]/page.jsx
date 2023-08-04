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

export default function CampaignPage({ params }) {
  const [user, loading] = useAuthState(auth);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const { campaignId, lng } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.paymentModal.isOpen);
  const editModalIsOpen = useSelector((state) => state.campaignEditModal.isOpen)
  const currentCampaign = useSelector((state) => state.campaign.currentCampaign);
  const campaignStatus = useSelector((state) => state.campaign.status);
  const campaignOwner = useSelector((state) => state.user.campaignOwner)

  const { t } = useTranslation(lng, "campaignId");
  console.log(params)

  // const getCampaignData = async () => {
  //   await dispatch(getCurrentCampaign(campaignId));
  //   console.log("page", currentCampaign)
  //   const currentCampaignId = currentCampaign.id
  //   await dispatch(getCampaignOwnerData(currentCampaignId))
  // };

  const getCampaignData = async () => {
    const currentCampaign = await dispatch(getCurrentCampaign(campaignId));
    const currentCampaignId = currentCampaign.payload.id
    if (currentCampaignId) {
      await dispatch(getCampaignOwnerData(currentCampaignId))
    }
  };

  useEffect(() => {
    getCampaignData()
  }, [campaignId, modalIsOpen, editModalIsOpen]);

  const handleModalToggle = () => {
    if (!user) {
      router.push("/sign-in");
    }
    if (user) {
      dispatch(openModal());
    }
  };

  const handleEditModalToggle = () => {
    dispatch(openEditModal())
  }

  const handleCancelCampaign = () => {
    setDeleteModalIsOpen((prevState) => !prevState)
  }

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
      {editModalIsOpen && <CampaignEditModal campaignId={campaignId} />}
      {deleteModalIsOpen && <DeleteModal campaignId={campaignId} setDeleteModalIsOpen={setDeleteModalIsOpen} />}
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
        currentCampaign && user && currentCampaign.id === user.uid && campaignOwner ? (
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
                <div className="h-20 w-20 rounded-full border-2 border-neutral-950 overflow-hidden bg-theme relative">
                  <Image
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={campaignOwner.name}
                    src={campaignOwner.photo ? campaignOwner.photo : "/assets/images/empty-user.png"}
                  />
                </div>
                <h3>
                  {campaignOwner.name}
                </h3>
              </div>

              <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0">
                {/* about campaign  */}
                <div className="flex flex-col space-y-5  rounded-lg border-2 lg:border-l-0 py-5 lg:rounded-none border-neutral-950 ">
                  <h4 className="text-xl">{t("About campaign")}</h4>
                  <p className="text-sm">{currentCampaign.about}</p>
                  {currentCampaign.category && (
                    <div>
                      <h5 className="text-md mb-2">Categories</h5>
                      <div className="flex justify-center items-center gap-2 text-sm">
                        {currentCampaign.category.map((category) =>
                          <span key={category.label} className="p-2 border-2 border-black bg-theme text-black rounded-lg">{category.value}</span>
                        )}
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
                          ? leftDays + " days left"
                          : "Campaign is over"}
                      </p>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-5">
                <Button
                  style={"w-[15rem] bg-neutral-950 text-white py-3 px-8 rounded-lg"}
                  name={t("Edit")}
                  clickAction={handleEditModalToggle}
                />
                <Button
                  style={"w-[15rem] bg-neutral-950 text-white py-3 px-8 rounded-lg"}
                  name={t("Cancel")}
                  clickAction={handleCancelCampaign}
                />
              </div>
            </div>
          </div>
        ) : (currentCampaign && user && campaignOwner &&
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
                <div className="h-20 w-20 rounded-full border-2 border-neutral-950 overflow-hidden bg-theme relative">
                  <Image
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={campaignOwner.name}
                    src={campaignOwner.photo ? campaignOwner.photo : "/assets/images/empty-user.png"}
                  />
                </div>
                <h3>
                  {campaignOwner.name}
                </h3>
              </div>

              <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0">
                {/* about campaign  */}
                <div className="flex flex-col space-y-5  rounded-lg border-2 lg:border-l-0 py-5 lg:rounded-none border-neutral-950 ">
                  <h4 className="text-xl">{t("About campaign")}</h4>
                  {currentCampaign.category && (
                    <div>
                      <h5 className="text-md mb-2">Categories</h5>
                      <div className="flex justify-center items-center gap-2 text-sm">
                        {currentCampaign.category.map((category) =>
                          <span key={category.label} className="p-2 border-2 border-black bg-theme text-black rounded-lg">{category.value}</span>
                        )}
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
