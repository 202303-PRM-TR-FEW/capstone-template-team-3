import "./LargeCard.css";

const LargeCard = () => {
  return (
    <main>
      <div>
        <p className="project-description">
          <span className="project-text">
            Project&nbsp;of&nbsp;the&nbsp;week
          </span>
        </p>
      </div>
      <div className="row">
        <div className="column">
          <div className="container-style"></div>
          <div className="image-container-style"></div>
        </div>
        <div className="column">
          <div className="project-title">
            <h1>
              Help us release <br />
              cookbook for parents <br /> and kids
            </h1>
          </div>
          <div className="project-descripe">
            <p>
              We want to create beautiful and helpful cooking book for parents
              and kids to have fun in kitchen.
            </p>
          </div>
          <div>
            <div
              className="custom-container"
              data-dom-node="true"
              mode="PROTOTYPE/MODES/MODE_PLAY"
            >
              <div>
                <div className="custom-background"></div>
              </div>
            </div>
          </div>
          <div className="campaign-info">
            <div className="campaign-amount">
              <p className="campaign-tag">Raised:</p>
              <p>$2.000</p>
            </div>
            <div className="campaign-amount">
              <p className="campaign-tag">Goal:</p>
              <p>$3.000</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LargeCard;
