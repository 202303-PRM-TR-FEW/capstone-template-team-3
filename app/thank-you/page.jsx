import NavLink from "../components/NavLink/NavLink";
import "./ty.css";
import thankyouPic from "public/assets/images/thankyou.png"
import Image from "next/image"


const ThankYouPage = () => {
    return (
  
      <div className="ty-bg">
        <Image className= "ty-img" src={thankyouPic}
                                alt="Illustration of a hand holding green hearts near books." 
                                priority={true} width={850} height={400}/>
            <div className="ty-container">
                <h2 className="ty-header">Thank you</h2>
                <h3 className="ty-sub-normal">
                  for supporting us!
                </h3>
                <div className="flex space-x-6 ty-buttons">
                <NavLink to="/navigation">
                  <button type="button" className="ty-first-button">
                    Make another donation
                  </button>
                </NavLink>
                <NavLink to="/welcome">
                  <button type="button" className="ty-second-button">
                    Go to homepage
                  </button>
                </NavLink>
                </div>
            </div>
      </div>
    );
  };

  export default ThankYouPage;