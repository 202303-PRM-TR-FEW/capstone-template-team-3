import { FaPaw } from "react-icons/fa6";

const AnimalsIcon = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FaPaw
        size={40}
        className="border-2 border-spacing-3 border-white rounded-md  hover:text-black hover:border-black"
      />
      <span className="text-xs">Animals</span>
    </div>
  );
};

export default AnimalsIcon;
