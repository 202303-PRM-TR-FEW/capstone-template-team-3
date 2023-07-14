import projects from "@/app/data/data";
import Image from "next/image";
import { FaRegCalendarDays } from "react-icons/fa6";

// export async function generateStaticParams() {
//   return projects.map((project) => ({
//     id: project.id.toString(),
//     title: project.title,
//   }));
// }

export default function CampaignPage({ params }) {
  const project = projects.find((p) => p.id === parseInt(params.campaignId));
  console.log(params);
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="flex flex-col items-center justify-center">
          <Image width={600} height={200} src={project.img} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <h3>{project.organizer ? project.organizer : "Organizer"}</h3>
        </div>
        <div>
          <h4>About project</h4>
          <p>{project.about}</p>
        </div>
        <div>
          <div>
            <div>
              <h5>Raised:</h5>
              <p>{"$" + project.raised}</p>
            </div>
            <div>
              <h5>Goal:</h5>
              <p>{"$" + project.goal}</p>
            </div>
          </div>
          <div>
            {/* <Bar /> */}
            <h5>
              <FaRegCalendarDays /> {project.date}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
