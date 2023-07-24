import { FaPaw } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css";
import { useTranslation } from 'app/i18n/client'

const AnimalsIcon = ({lng}) => {
  const { t } = useTranslation(lng, 'animalsIcon')
  return (
    <div className="icon-main">
      <FaPaw
        size={40}
        className="icon"
      />
      <span className="text-xs">{t("Animals")}</span>
    </div>
  );
};

export default AnimalsIcon;
