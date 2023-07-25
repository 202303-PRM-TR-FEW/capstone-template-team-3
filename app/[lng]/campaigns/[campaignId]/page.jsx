"use client";

import Button from "@/app/components/Button/Button";
import projects from "@/app/data/data";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import Link from "next/link";
import { useTranslation } from "../../../i18n/client";

// export async function generateStaticParams() {
//   return projects.map((project) => ({
//     id: project.id.toString(),
//     title: project.title,
//   }));
// }

export default function CampaignPage({ params, lng }) {
  const { t } = useTranslation(lng, "campaignId");

  const project = projects.find((p) => p.id === parseInt(params.campaignId));
  console.log(params);
  // console.log(project);
  return (
    // main container
    <div className="flex flex-col p-4 lg:pt-20 text-center lg:flex lg:flex-row lg:space-x-5  lg:items-start lg:mx-16 ">
      {/* left container */}
      <div className="mb-5">
        <Image
          className="bg-slate-100 rounded-xl"
          width={1200}
          height={200}
          src={project.img}
          alt={project.title}
        />
      </div>
      {/* right container  */}
      <div className="flex flex-col space-y-5 lg:">
        <h1 className="text-2xl font-bold lg:text-start ">{project.title}</h1>
        <div className="flex items-center justify-center space-x-5 lg:justify-start">
          <Image
            className="rounded-full border-2 border-neutral-950"
            alt={project.organizer}
            src={project.img}
            width={50}
            height={50}
          />
          <h3>
            {project.organizer ? project.organizer : <>{t("Organizer")}</>}
          </h3>
        </div>

        <div className="flex flex-col space-y-5 lg:flex-row lg:space-y-0">
          {/* about project  */}
          <div className="flex flex-col space-y-5  rounded-lg border-2 lg:border-l-0 py-5 lg:rounded-none border-neutral-950 ">
            <h4 className="text-xl">{t("About project")}:</h4>
            <p className="text-sm">{project.about}</p>
          </div>
          {/* project details   */}
          <div className="flex flex-col justify-around py-5 rounded-lg lg:border-r-0 lg:rounded-none text-center items-center border-2 border-neutral-950">
            <div className="flex space-x-10 ">
              <div className="p-2">
                <h5>{t("Raised")}:</h5>
                <p>{"$" + project.raised}</p>
              </div>
              <div className="bg-theme rounded-lg p-2">
                <h5>{t("Goal")}:</h5>
                <p>{"$" + project.goal}</p>
              </div>
            </div>
            <div>
              <h5 className="flex items-center">
                <FaRegCalendarDays /> {project.date}
              </h5>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:flex lg:justify-start">
          <Link href={"/payment"}>
            <Button
              style={"bg-neutral-950 text-white  py-3 px-16  rounded-lg"}
              name={t("Fund this project!")}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
