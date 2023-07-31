import { FaGraduationCap } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css"

const EducationIcon = () => {
  return (
    <div className="icon-main">
      <FaGraduationCap
        size={40}
        className="icon"
        
      />
      <span className="text-xs">Education</span>
    </div>
  );
};

export default EducationIcon;
