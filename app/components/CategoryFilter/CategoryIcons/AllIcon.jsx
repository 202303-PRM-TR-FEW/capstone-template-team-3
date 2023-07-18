import { FaGlobe } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css"

const AllIcon = () => {
  return (
    <div className="icon-main">
      <FaGlobe
        size={40}
        className="icon"
      />
      <span className="text-xs">All</span>
    </div>
  );
};

export default AllIcon;
