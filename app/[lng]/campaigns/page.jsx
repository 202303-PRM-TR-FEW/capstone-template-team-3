"use client";

import CategoryFilter from "app/components/CategoryFilter/CategoryFilter.jsx";
import LargeCard from "../components/LargeCard/LargeCard";
import Card from "app/components/Card/Card.jsx";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "app/firebase/firebase.jsx";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ca } from "date-fns/locale";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const filteredCampaignsByCategory = getCampaignsByCategory(
    campaigns,
    category
  );

  // Read campaigns from database
  useEffect(() => {
    const q = query(collection(db, "campaigns"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let campaignsArr = [];
      querySnapshot.forEach((campaign) => {
        campaignsArr.push({ ...campaign.data(), id: campaign.id });
      });
      setCampaigns(campaignsArr);
    });
    return () => unsubscribe();
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
            <Card
              img={campaign.image}
              title={campaign.projectName}
              raised={campaign.raised}
              goal={campaign.goal}
            />
          </div>
        ))}
      </div>
    </main>
  );
};
const getCampaignsByCategory = (campaigns, category) => {
  if (campaigns && campaigns.length > 0 && category) {
    const filteredCampaigns = campaigns.filter((campaign) => {
      return campaign.category?.map((item) => item.value).includes(category);
    });
    return filteredCampaigns;
  }
  return campaigns;
};

export default Campaigns;
