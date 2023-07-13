import projects from "@/app/data/data";
import Image from "next/image";
import Link from "next/link";

console.log(projects);
export const getStaticProps = async () => {
  console.log(projects);
  return {
    props: { campaigns: projects },
  };
};

const Campaigns = ({ campaigns }) => {
  return (
    <div>
      <h1>All Campaigns</h1>
      {campaigns.map((campaign) => (
        <Link href={"/campaign/" + campaign.id} key={campaign.id}>
          <h3>{campaign.title}</h3>
          <Image
            src={campaign.img}
            alt={campaign.title}
            width={200}
            height={200}
          />

          <p>{campaign.about}</p>
          <p>Goal: {campaign.goal}</p>
          <p>Raised: {campaign.raised}</p>
        </Link>
      ))}
    </div>
  );
};

export default Campaigns;
