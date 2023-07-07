import { FaMasksTheater } from "react-icons/fa6";

const CultureIcon = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FaMasksTheater
        size={40}
        className="border-2 border-spacing-4 border-white rounded-md  hover:text-black hover:border-black"
      />
      <span className="text-xs">Culture</span>
    </div>
  );
};

export default CultureIcon;
