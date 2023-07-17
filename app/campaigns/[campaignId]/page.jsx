import Button from "@/app/components/Button/Button";
import projects from "@/app/data/data";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";
import Link from "next/link";

// export async function generateStaticParams() {
//   return projects.map((project) => ({
//     id: project.id.toString(),
//     title: project.title,
//   }));
// }

export default function CampaignPage({ params }) {
  const project = projects.find((p) => p.id === parseInt(params.campaignId));
  console.log(params);
  // console.log(project);
  return (
    <div className="p-3 space-y-5">
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="flex flex-col items-center justify-center">
          <Image
            width={600}
            height={200}
            src={project.img}
            alt={project.title}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="flex flex-col items-center justify-center space-y-5">
          <h1 className="text-2xl font-bold text-center">{project.title}</h1>
          <div className="flex items-center justify-center space-x-5">
            <Image
              className="rounded-full border-2 border-neutral-950"
              alt={project.organizer}
              src={project.img}
              width={50}
              height={50}
            />
            <h3>{project.organizer ? project.organizer : "Organizer"}</h3>
          </div>
        </div>
        <div className="flex flex-col space-y-5 border-y-2 border-spacing-9 border-neutral-950 py-5">
          <h4 className="text-xl">About project</h4>
          <p className="text-sm">{project.about}</p>
        </div>
        <div className="flex justify-between items-center space-x-10">
          <div>
            <h5>Raised:</h5>
            <p>{"$" + project.raised}</p>
          </div>
          <div className="bg-theme rounded-lg p-2">
            <h5>Goal:</h5>
            <p>{"$" + project.goal}</p>
          </div>

          <div>
            <h5 className="flex flex-col items-center">
              <FaRegCalendarDays /> {project.date}
            </h5>
          </div>
        </div>
        <Link href={"/payment"}>
          <Button name={"Donate Now!"} />
        </Link>
      </div>
    </div>
  );
}
