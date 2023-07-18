import { FaMasksTheater } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css"

const CultureIcon = () => {
  return (
    <div className="icon-main">
      <FaMasksTheater
        size={40}
        className="icon"
      />
      <span className="text-xs">Culture</span>
    </div>
  );
};

export default CultureIcon;
