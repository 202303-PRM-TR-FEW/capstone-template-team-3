"use client";

import { useState } from "react";
import AllIcon from "./CategoryIcons/AllIcon";
import EducationIcon from "./CategoryIcons/EducationIcon";
import CultureIcon from "./CategoryIcons/CultureIcon";
import AnimalsIcon from "./CategoryIcons/AnimalsIcon";
import ChildrenIcon from "./CategoryIcons/ChildrenIcon";
import "../CategoryFilter/CategoryFilter.css"
import { useTranslation } from '../../i18n/client'

const CategoryFilter = ({lng}) => {
  const [selected, setSelected] = useState("all");
  const { t } = useTranslation(lng, 'categoryFilter')

  const handleClick = (category) => {
    setSelected(category);
  };

  return (
    <div className="category-main">
      <h2 className="category-text">{t("Categories")}</h2>
      <div className="category-icons">
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
