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

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

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
          <div key={index}>
            <Card
              img={campaign.img}
              title={campaign.title}
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
