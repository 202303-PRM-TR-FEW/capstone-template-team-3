import projects from "@/app/data/data";

// export async function generateStaticParams() {
//   return projects.map((project) => ({
//     id: project.id.toString(),
//     title: project.title,
//   }));
// }

export default function CampaignPage({ params }) {
  const project = projects.find((p) => p.id === parseInt(params.Id));

  console.log(project);
  return (
    <div>
      <h1>This is the campaign page for campaign: {project.title}</h1>
      <p>Title: {project.title}</p>
    </div>
  );
}
