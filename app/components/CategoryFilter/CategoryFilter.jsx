import Link from "next/link";
import React from "react";
import {
  FaGlobe,
  FaPaw,
  FaChild,
  FaGraduationCap,
  FaMasksTheater,
} from "react-icons/fa6";
// new
const CategoryFilter = () => {
  const categories = [
    { name: "All", query: null, icon: <FaGlobe /> },
    { name: "Education", query: `Education`, icon: <FaGraduationCap /> },
    { name: "Culture", query: `Culture`, icon: <FaMasksTheater /> },
    { name: "Animals", query: `Animals`, icon: <FaPaw /> },
    { name: "Children", query: `Children`, icon: <FaChild /> },
  ];

  return (
    <div className="flex">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={{
            pathname: "/campaigns",
            query: { category: category.query },
          }}
          className="flex flex-col items-center justify-center gap-2 rounded-md p-2 hover:bg-gray-200 transition-colors duration-200"
        >
          <div className="text-2xl border border-neutral-900 rounded-lg p-2 ">
            {category.icon}
          </div>
          <div>{category.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
