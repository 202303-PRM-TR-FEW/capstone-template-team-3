import { FaMasksTheater } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css"
import { useTranslation } from 'app/i18n/client'

const CultureIcon = ({lng}) => {
  const { t } = useTranslation(lng, 'cultureIcon')
  return (
    <div className="icon-main">
      <FaMasksTheater
        size={40}
        className="icon"
      />
      <span className="text-xs">{t("Culture")}</span>
    </div>
  );
};

export default CultureIcon;
