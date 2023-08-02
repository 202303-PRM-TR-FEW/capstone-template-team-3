"use client";

import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import LargeCard from "../components/LargeCard/LargeCard";
import Card from "../components/Card/Card";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllCampaigns } from "@/app/lib/features/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../i18n/client";


const Campaigns = ({lng}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch()
  const { t } = useTranslation(lng, "campaingId");
  const allCampaigns = useSelector((state) => state.campaign.allCampaigns)
  const category = searchParams.get("category");

  const getCampaignsByCategory = (allCampaigns, category) => {
    if (allCampaigns && allCampaigns.length > 0 && category) {
      const filteredCampaigns = allCampaigns.filter((campaign) => {
        return campaign.data.category
          ?.map((item) => item.value)
          .includes(category);
      });
      console.log(filteredCampaigns);
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

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <main>
      <LargeCard />
      <CategoryFilter />
      <div className="flex flex-row gap-4 flex-wrap items-center justify-evenly container w-11/12 mx-auto">
        {filteredCampaignsByCategory.map((campaign) => (
          <div
            key={campaign.id}
            onClick={() => push(`/campaigns/${campaign.id}`)}
          >
            <Card lng={lng}
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
