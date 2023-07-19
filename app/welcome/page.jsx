import NavLink from "../components/NavLink/NavLink";
import "./welcome.css";

const WelcomePage = () => {
  return (
    <div className="welcome-main-container ">
      <div
        className="welcome"
        style={{
          backgroundImage: "url(/welcomepage.png)",
        }}
      >
        <div className="welcome-container">
          <div className="leading-left ">
            <h1 className="leading-header">Givingly</h1>
            <p className="leading-normal">
              Supporting great <br></br> causes made easy
            </p>
            <p className="leading-sub-normal">
              We helped over 3,500 projects and causes. Sign in today and get
              your idea kicked off or support others kick off their amazing
              projects.
            </p>
            <NavLink to="/navigation" style="leading-button">
              Start today
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
