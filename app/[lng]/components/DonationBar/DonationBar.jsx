import React from "react";

const DonationBar = ({ goal, raised }) => {
  const parsedGoal = parseInt(goal);
  const parsedRaised = parseInt(raised);

  if (isNaN(parsedGoal) || isNaN(parsedRaised) || parsedGoal <= 0) {
    return <div>Error: Invalid input</div>;
  }

  const progress = (parsedRaised / parsedGoal) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 ">
      <div
        data-cy="progressBar"
        className="bg-theme h-2.5 rounded-full dark:bg-theme"
        style={{ width: `${progress <= 100 ? progress : 100}%` }}
      ></div>
    </div>
  );
};

export default DonationBar;
