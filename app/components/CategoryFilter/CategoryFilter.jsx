"use client";

import { useState } from "react";

import AllIcon from "./CategoryIcons/AllIcon";
import EducationIcon from "./CategoryIcons/EducationIcon";
import CultureIcon from "./CategoryIcons/CultureIcon";
import AnimalsIcon from "./CategoryIcons/AnimalsIcon";
import ChildrenIcon from "./CategoryIcons/ChildrenIcon";

const CategoryFilter = () => {
  const [selected, setSelected] = useState("all");

  const handleClick = (category) => {
    setSelected(category);
  };

  return (
    <div className="flex flex-col p-3 m-5 space-y-4">
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="flex flex-row items-center gap-4 text-white">
        <AllIcon onClick={() => handleClick("all")} />
        <EducationIcon onClick={() => handleClick("education")} />
        <CultureIcon onClick={() => handleClick("culture")} />
        <AnimalsIcon onClick={() => handleClick("animals")} />
        <ChildrenIcon onClick={() => handleClick("children")} />
      </div>
    </div>
  );
};

export default CategoryFilter;
