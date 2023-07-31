"use client";

import Button from "@/app/components/Button/Button";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import Link from "next/link";
import { useTranslation } from "../../../i18n/client";
import {
  getDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "@firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { useEffect, useState } from "react";
import { ca } from "date-fns/locale";
import DonationBar from "@/app/components/DonationBar/DonationBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/app/lib/features/paymentModalSlice";
import PaymentModal from "@/app/components/PaymentModal/PaymentModal";

export default function CampaignPage({ params, lng }) {
  const [user, loading] = useAuthState(auth);
  const [campaign, setCampaign] = useState({});
  const { campaignId } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const docRef = doc(db, "campaigns", campaignId);
  const modalIsOpen = useSelector((state) => state.paymentModal.isOpen);

  const { t } = useTranslation(lng, "campaignId");

  useEffect(() => {
    const getCampaign = async () => {
      const docSnap = await getDoc(docRef);
      setCampaign(docSnap.data());
    };
    getCampaign();
    // console.log(campaign);
  }, [campaignId, modalIsOpen]);

  // console.log(campaignId);
  // console.log(campaignId);

  const handleModalToggle = () => {
    if (!user) {
      router.push("/sign-in");
    }
    if (user) {
      dispatch(openModal());
    }
  };

  return (
    // main container
    <>
      {modalIsOpen && <PaymentModal campaignId={campaignId} />}
      <div className="flex flex-col p-3 items-center lg:pt-20 text-center lg:flex lg:flex-row lg:space-x-5  lg:items-start lg:mx-16 lg:justify-center ">
        {/* left container */}
        <div className="mb-5 max-w-3xl">
          <Image
            className="bg-slate-100 rounded-xl"
            width={1200}
            height={200}
            src={campaign.image}
            alt={campaign.projectName}
          />
        </div>
        {/* right container  */}
        <div className="flex flex-col space-y-5 ">
          <h1 className="text-2xl font-bold lg:text-start ">
            {campaign.projectName}
          </h1>
          <div className="flex items-center justify-center space-x-5 lg:justify-start">
            <Image
              className="rounded-full border-2 border-neutral-950"
              alt={campaign.organizer}
              src={campaign.image}
              width={50}
              height={50}
            />
            <h3>
              {campaign.organizer ? campaign.organizer : <>{t("Organizer")}</>}
            </h3>
          </div>

          <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0">
            {/* about campaign  */}
            <div className="flex flex-col space-y-5  rounded-lg border-2 lg:border-l-0 py-5 lg:rounded-none border-neutral-950 ">
              <h4 className="text-xl">{t("About campaign")}</h4>
              <p className="text-sm">{campaign.about}</p>
            </div>
            {/* campaign details   */}
            <div className="flex flex-col justify-around py-5 rounded-lg lg:border-r-0 lg:rounded-none text-center items-center border-2 space-y-3 border-neutral-950">
              <div className="flex space-x-10 ">
                <div className="p-2">
                  <h5>{t("Raised")}:</h5>
                  <p>{"$" + campaign.raised}</p>
                </div>
                <div className="bg-theme rounded-lg p-2">
                  <h5>{t("Goal")}:</h5>
                  <p>{"$" + campaign.goal}</p>
                </div>
              </div>
              <DonationBar raised={campaign.raised} goal={campaign.goal} />
              <div>
                <h5 className="flex items-center">
                  <FaRegCalendarDays /> {campaign.date}
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
    </>
  );
}
