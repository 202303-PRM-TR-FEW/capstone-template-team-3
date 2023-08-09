"use client";

import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import LargeCard from "../components/LargeCard/LargeCard";
import Card from "../components/Card/Card";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllCampaigns,
  getCharities,
  getCampaignOfTheWeek,
} from "@/app/lib/features/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../i18n/client";
import Loader from "../components/Loader/loader";

const Campaigns = ({ params }) => {
  const { lng } = params;
  const [totalCharity, setTotalCharity] = useState(0);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { t } = useTranslation(lng, "campaign");
  const allCampaigns = useSelector((state) => state.campaign.allCampaigns);
  const allCharities = useSelector((state) => state.campaign.charities);
  const campaignOfTheWeek = useSelector(
    (state) => state.campaign.campaignOfTheWeek
  );
  const userStatus = useSelector((state) => state.user.status);
  const campaignStatus = useSelector((state) => state.campaign.status);
  const category = searchParams.get("category");

  const getCampaignsByCategory = (allCampaigns, category) => {
    if (allCampaigns && allCampaigns.length > 0 && category) {
      const filteredCampaigns = allCampaigns.filter((campaign) => {
        return campaign.data.category
          ?.map((item) => item.value)
          .includes(category);
      });
      return filteredCampaigns;
    }
    return allCampaigns;
  };

  const filteredCampaignsByCategory = getCampaignsByCategory(
    allCampaigns,
    category
  );

  const getCampaigns = async () => {
    dispatch(getAllCampaigns());
  };

  const getCampaignCharities = async () => {
    dispatch(getCharities());
  };

  const getWeeklyCampaign = async () => {
    dispatch(getCampaignOfTheWeek());
  };

  useEffect(() => {
    getWeeklyCampaign();
    getCampaigns();
    getCampaignCharities();
  }, []);

  useEffect(() => {
    if (allCharities.length > 0) {
      setTotalCharity(allCharities.reduce((sum, charity) => sum + charity, 0));
    }
  }, [allCharities]);

  return userStatus === "loading" || campaignStatus === "loading" ? (
    <Loader />
  ) : (
    <main>
      {campaignOfTheWeek.map((campaign) => (
        <LargeCard
          key={campaign.id}
          lng={lng}
          img={campaign.data.image}
          title={campaign.data.projectName}
          about={campaign.data.about}
          raised={campaign.data.raised}
          goal={campaign.data.goal}
          clickAction={() => push(`/${lng}/campaigns/${campaign.id}`)}
        />
      ))}
      <div className="flex flex-col justify-center items-center bg-theme p-5 w-5/6 mx-auto rounded-xl gap-3 my-5 sm:w-1/2 lg:w-1/3">
        <p className="text-center">{t("Thanks to our supporters")}</p>
        <div className="bg-accent-black text-accent p-5 rounded-xl">
          <span>{`$${totalCharity}`}</span>
        </div>
        <h3 className="text-center">{t("accumulated for charity")}!</h3>
      </div>
      <CategoryFilter />
      <div className="flex flex-row gap-4 flex-wrap items-center justify-evenly container w-11/12 mx-auto">
        {filteredCampaignsByCategory.map((campaign) => (
          <div
            key={campaign.id}
            onClick={() => push(`/${lng}/campaigns/${campaign.id}`)}
          >
            <Card
              lng={lng}
              img={campaign.data.image}
              title={campaign.data.projectName}
              raised={campaign.data.raised}
              goal={campaign.data.goal}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Campaigns;
