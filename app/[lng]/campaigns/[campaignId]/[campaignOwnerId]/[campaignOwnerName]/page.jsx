"use client";

import {
  getAllOwnerCampaigns,
  getAllOwnerDonations,
} from "@/app/lib/features/campaignSlice";
import { getCampaignOwnerProfileData } from "@/app/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import Card from "@/app/[lng]/components/Card/Card";
import Loader from "@/app/[lng]/components/Loader/loader";

const OwnerCampaigns = ({ params }) => {
  const { lng, campaignId, campaignOwnerId } = params;
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation(lng, "campaignId");
  const campaignOwner = useSelector(
    (state) => state.user.campaignOwnerProfileData
  );
  const ownerCampaigns = useSelector((state) => state.campaign.ownerCampaigns);
  const ownerDonations = useSelector((state) => state.campaign.ownerDonations);
  const userStatus = useSelector((state) => state.user.status)
  const campaignStatus = useSelector((state) => state.campaign.status);

  const getCampaignOwnerData = async () => {
    await dispatch(getCampaignOwnerProfileData(campaignOwnerId));
  };

  const getOwnerCampaigns = async () => {
    await dispatch(getAllOwnerCampaigns(campaignOwnerId));
  };

  const getOwnerDonations = async () => {
    await dispatch(getAllOwnerDonations(campaignOwnerId));
  };

  useEffect(() => {
    getCampaignOwnerData();
    getOwnerCampaigns();
    getOwnerDonations();
  }, []);

  return (
    userStatus === "loading" || campaignStatus === "loading" ? (<Loader />) : (
      campaignOwner &&
      ownerCampaigns &&
      ownerDonations && (
        <main>
          <h3 className="text-center py-5">
            {`${campaignOwner.name}` + " " + t("Kicked-Off These Campaigns")}:
          </h3>
          <div className="container mx-auto grid grid-cols-3 place-items-center gap-5 pb-5">
            {Array.isArray(ownerCampaigns) &&
              ownerCampaigns.length > 0 &&
              ownerCampaigns.map((campaign, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      router.push(`/${lng}/campaigns/${campaign.id}`)
                    }
                  >
                    <Card
                      lng={lng}
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
          <h3 className="text-center py-5">
            {`${campaignOwner.name}` + " " + t("Is Supporting These Campaigns")}:
          </h3>
          <div className="container mx-auto grid grid-cols-3 place-items-center gap-5 pb-5">
            {Array.isArray(ownerDonations) &&
              ownerDonations.length > 0 &&
              ownerDonations.map((campaign, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      router.push(`/${lng}/campaigns/${campaign.id}`)
                    }
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
      )
    )
  );
};

export default OwnerCampaigns;
