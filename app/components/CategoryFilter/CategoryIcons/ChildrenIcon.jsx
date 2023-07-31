import { FaChild } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css"

const ChildrenIcon = () => {
  return (
    <div className="icon-main">
      <FaChild
        size={40}
        className="icon"
      />
      <span className="text-xs">Children</span>
    </div>
  );
};

export default ChildrenIcon;
