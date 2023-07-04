import "./welcome.css";

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

            <button className="leading-button">Start today</button>
          </div>
          {/* <!--Right Col--> */}
          {/* <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full md:w-4/5 z-50" src="/welcomepage.png" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
