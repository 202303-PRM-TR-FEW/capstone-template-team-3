import "../CategoryFilter/CategoryFilter.css";
import { useTranslation } from "../../../i18n/client";
import Link from "next/link";
import React from "react";
import {
  FaGlobe,
  FaPaw,
  FaChild,
  FaGraduationCap,
  FaMasksTheater,
} from "react-icons/fa6";

const CategoryFilter = ({ lng }) => {
  const { t } = useTranslation(lng, "categoryFilter");

  const categories = [
    { name: t("All"), query: null, icon: <FaGlobe /> },
    { name: t("Education"), query: `Education`, icon: <FaGraduationCap /> },
    { name: t("Culture"), query: `Culture`, icon: <FaMasksTheater /> },
    { name: t("Animals"), query: `Animals`, icon: <FaPaw /> },
    { name: t("Children"), query: `Children`, icon: <FaChild /> },
  ];

  return (
    <div className="flex ">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={{
            pathname: "/en/campaigns",
            query: { category: category.query },
          }}
          className="icon-main"
          passHref
        >
          <div className="icon">{category.icon}</div>
          <div>{category.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
