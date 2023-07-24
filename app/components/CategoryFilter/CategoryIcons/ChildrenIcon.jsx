import { FaChild } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css";
import { useTranslation } from "app/i18n/client";

const ChildrenIcon = ({ lng }) => {
  const { t } = useTranslation(lng, "childrenIcon");

  return (
    <div className="icon-main">
      <FaChild size={40} className="icon" />
      <span className="text-xs">{t("Children")}</span>
    </div>
  );
};

export default ChildrenIcon;
