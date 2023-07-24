import { FaGlobe } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css"
import { useTranslation } from 'app/i18n/client.js'

const AllIcon = ({lng}) => {
  const { t } = useTranslation(lng, 'allIcon')
  return (
    <div className="icon-main">
      <FaGlobe
        size={40}
        className="icon"
      />
      <span className="text-xs">{t("All")}</span>
    </div>
  );
};

export default AllIcon;
