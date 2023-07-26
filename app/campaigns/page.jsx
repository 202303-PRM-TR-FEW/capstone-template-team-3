"use client";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import LargeCard from "../components/LargeCard/LargeCard";
import Card from "../components/Card/Card.jsx";
import {
  collection,
  getDoc,
  query,
  querySnapshot,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ca } from "date-fns/locale";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const router = useRouter();

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
  }, []);

  return (
    <main>
      <LargeCard />
      <CategoryFilter />
      <div className="flex flex-row gap-4 flex-wrap items-center justify-evenly container w-11/12 mx-auto">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            onClick={() => router.push(`/campaigns/${campaign.id}`)}
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

export default Campaigns;
