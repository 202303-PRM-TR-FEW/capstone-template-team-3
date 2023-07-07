import { FaGlobe } from "react-icons/fa6";

const AllIcon = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FaGlobe
        size={40}
        className="border-2 border-spacing-3 border-white rounded-md hover:text-black hover:border-black "
      />
      <span className="text-xs">All</span>
    </div>
  );
};

export default AllIcon;
