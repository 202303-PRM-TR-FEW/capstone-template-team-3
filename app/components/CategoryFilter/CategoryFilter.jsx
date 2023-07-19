"use client";

import { useState } from "react";

import AllIcon from "./CategoryIcons/AllIcon";
import EducationIcon from "./CategoryIcons/EducationIcon";
import CultureIcon from "./CategoryIcons/CultureIcon";
import AnimalsIcon from "./CategoryIcons/AnimalsIcon";
import ChildrenIcon from "./CategoryIcons/ChildrenIcon";
import "../CategoryFilter/CategoryFilter.css"


const CategoryFilter = () => {
  const [selected, setSelected] = useState("all");

  const handleClick = (category) => {
    setSelected(category);
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col p-3 m-5 space-y-4 container w-11/12 mx-auto">
      <h2 className="text-2xl font-bold">Categories</h2>
      <div className="flex flex-row items-center gap-4 text-white">
=======
    <div className="category-main">
      <h2 className="category-text">Categories</h2>
      <div className="category-icons">
>>>>>>> 3259732726f7d04e0a8fe07e77fd4ea62ec9351e
        <AllIcon onClick={() => handleClick("all")} />
        <EducationIcon onClick={() => handleClick("education")}/>
        <CultureIcon onClick={() => handleClick("culture")} />
        <AnimalsIcon onClick={() => handleClick("animals")} />
        <ChildrenIcon onClick={() => handleClick("children")} />
      </div>
    </div>
  );
};

export default CategoryFilter;
