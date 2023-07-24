"use client";

import CategoryFilter from "app/components/CategoryFilter/CategoryFilter.jsx";
import LargeCard from "app/[lng]/components/LargeCard/LargeCard.jsx";
import Card from "app/components/Card/Card.jsx";
import projects from "app/data/data.jsx";

export default function Campaigns() {
  return (
    <main>
      <LargeCard />
      <CategoryFilter />
      <div className="flex flex-row gap-4 flex-wrap items-center justify-evenly container w-11/12 mx-auto">
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
}
