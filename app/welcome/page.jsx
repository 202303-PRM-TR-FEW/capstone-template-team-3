import "./welcome.css";
import Link from "next/link";

const WelcomePage = () => {
  return (
    <div
      className="welcome"
      style={{
        margin: "3em",
        backgroundImage: "url(/welcomepage.png)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="welcome">
        <div className="container">
          {/* <!--Left Col--> */}
          <div className="leading-left">
            <h1 className="leading-header">Givingly</h1>
            <p className="leading-normal">
              Supporting great <br></br> causes made easy
            </p>
            <p className="leading-sub-normal">
              We helped over 3,500 projects and causes. Sign <br></br> in today
              and get your idea kicked off or support <br></br> others kick off
              their amazing projects.
            </p>
            <Link href="/navigation">
              <button className="leading-button">Start today</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
