import { FaChild } from "react-icons/fa6";

const ChildrenIcon = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FaChild
        size={40}
        className="border-2 border-spacing-4 border-white rounded-md  hover:text-black hover:border-black"
      />
      <span className="text-xs">Children</span>
    </div>
  );
};

export default ChildrenIcon;
