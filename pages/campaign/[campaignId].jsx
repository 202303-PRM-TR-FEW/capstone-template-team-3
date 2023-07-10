import React from "react";
import data from "@/app/data/data";
import Image from "next/image";

export const getStaticPaths = async () => {
  const paths = data.map((campaign) => {
    return {
      params: { campaignId: campaign.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const campaignId = context.params.campaignId;
  const res = data.find((campaign) => campaign.id === parseInt(campaignId));
  const campaign = res;

  return {
    props: { campaign },
  };
};

const CampaignDetails = ({ campaign }) => {
  return (
    <>
      <div>
        <h1>{campaign.title}</h1>
        <Image
          src={campaign.img}
          width={200}
          height={200}
          alt={campaign.title}
        />
        <p>{campaign.about}</p>
        <p>Goal: {campaign.goal}</p>
        <p>Raised: {campaign.raised}</p>
      </div>

      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            class="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default CampaignDetails;
