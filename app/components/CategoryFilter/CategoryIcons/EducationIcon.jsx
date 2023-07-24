import { FaGraduationCap } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css";
import { useTranslation } from "app/i18n/client";

const EducationIcon = ({ lng }) => {
  const { t } = useTranslation(lng, "educationIcon");

  return (
    <div className="icon-main">
      <FaGraduationCap size={40} className="icon" />
      <span className="text-xs">{t("Education")}</span>
    </div>
  );
};

export default EducationIcon;
