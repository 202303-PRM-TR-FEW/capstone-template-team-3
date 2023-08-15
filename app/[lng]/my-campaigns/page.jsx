"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app/firebase/firebase.jsx";
import {
  getAllUserCampaigns,
  getAllUserDonations,
} from "../../lib/features/campaignSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card/Card";
import PaymentModal from "../components/KickOff/KickOff";
import { useTranslation } from "../../i18n/client";
import Loader from "../components/Loader/loader";

const MyCampaigns = ({ params }) => {
  const { lng } = params;
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation(lng, "myCampaings");
  const dispatch = useDispatch();
  const router = useRouter();
  const modalIsOpen = useSelector((state) => state.kickOffModal.isOpen);
  const userCampaigns = useSelector((state) => state.campaign.userCampaigns);
  const userDonations = useSelector((state) => state.campaign.userDonations);
  const campaignStatus = useSelector((state) => state.campaign.status);

  const getUserCampaigns = async () => {
    const userId = user.uid;
    dispatch(getAllUserCampaigns(userId));
  };

  const getUserDonations = async () => {
    const userId = user.uid;
    dispatch(getAllUserDonations(userId));
  };

  useEffect(() => {
    if (!loading) {
      getUserCampaigns();
      getUserDonations();
    }
  }, [loading]);

  return campaignStatus === "loading" ? (
    <Loader />
  ) : user ? (
    <main>
      {modalIsOpen && <PaymentModal />}
      <h3 className="text-center py-5">{t("Your Campaigns")}</h3>
      <div className="container mx-auto flex flex-wrap flex-row justify-center items-center gap-5 pb-5">
        {Array.isArray(userCampaigns) &&
          userCampaigns.length > 0 &&
          userCampaigns.map((campaign, index) => {
            return (
              <div
                key={index}
                onClick={() => router.push(`/${lng}/campaigns/${campaign.id}`)}
              >
                <Card
                  lng={lng}
                  key={campaign.id}
                  title={campaign.data.projectName}
                  goal={campaign.data.goal}
                  img={campaign.data.image}
                  raised={campaign.data.raised}
                  dataCy="campaign-card"
                />
              </div>
            );
          })}
      </div>
      <h3 className="text-center py-5">{t("You Are Supporting")}</h3>
      <div className="container mx-auto flex flex-wrap flex-row justify-center items-center gap-5 pb-5">
        {Array.isArray(userDonations) &&
          userDonations.length > 0 &&
          userDonations.map((campaign, index) => {
            return (
              <div
                key={index}
                onClick={() => router.push(`/${lng}/campaigns/${campaign.id}`)}
              >
                <Card
                  key={campaign.id}
                  title={campaign.data.projectName}
                  goal={campaign.data.goal}
                  img={campaign.data.image}
                  raised={campaign.data.raised}
                />
              </div>
            );
          })}
      </div>
    </main>
  ) : (
    <Loader />
  );
};

export default MyCampaigns;
