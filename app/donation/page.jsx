import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import LargeCard from "../components/LargeCard/donation";
import Card from "../components/Card/Card.jsx";
import projects from "app/data/data.jsx";

const Donation = () => {
  return (
    <main> 
      <LargeCard />
      <CategoryFilter />

      <div className="flex flex-row gap-4 ml-4 mb-4 flex-wrap">
        {projects.map((project, index) => (
          <div key={index}>
            <Card
              img={project.img}
              title={project.title}
              raised={project.raised}
              goal={project.goal}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Donation;