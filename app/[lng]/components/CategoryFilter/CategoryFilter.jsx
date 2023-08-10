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
import { useSearchParams } from 'next/navigation'

const CategoryFilter = ({ lng, href }) => {
  const { t } = useTranslation(lng, "categoryFilter");
  const searchParams = useSearchParams()
  const search = searchParams.get('category')

  const categories = [
    { name: t("All"), query: null, icon: <FaGlobe /> },
    { name: t("Education"), query: t("Education"), icon: <FaGraduationCap /> },
    { name: t("Culture"), query: t("Culture"), icon: <FaMasksTheater /> },
    { name: t("Animals"), query: t("Animals"), icon: <FaPaw /> },
    { name: t("Children"), query: t("Children"), icon: <FaChild /> },
  ];

  console.log(search)

  return (
    <div className="categories">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={{
            path: "/campaigns",
            query: { category: category.query },
          }}
          className={search === t(category.name) || category.name === t("All") && !search ? "icon-main-selected" : "icon-main"}
        >
          <div className={search === t(category.name) || category.name === t("All") && !search ? "icon-selected" : "icon"}>{category.icon}</div>
          <div className={search === t(category.name) || category.name === t("All") && !search ? "" : "category-text-selected"}>{category.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
