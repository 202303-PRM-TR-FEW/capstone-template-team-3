import { FaGraduationCap } from "react-icons/fa6";

const EducationIcon = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <FaGraduationCap
        size={40}
        className="border-2 border-spacing-4 border-white rounded-md  hover:text-black hover:border-black"
      />
      <span className="text-xs">Education</span>
    </div>
  );
};

export default EducationIcon;
