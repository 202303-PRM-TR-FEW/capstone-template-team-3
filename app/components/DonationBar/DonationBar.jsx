import React from "react";

const DonationBar = ({ goal, raised }) => {
  // Ensure goal and raised are valid numbers
  const parsedGoal = parseInt(goal);
  const parsedRaised = parseInt(raised);

  if (isNaN(parsedGoal) || isNaN(parsedRaised) || parsedGoal <= 0) {
    return <div>Error: Invalid input</div>;
  }

  const progress = (parsedRaised / parsedGoal) * 100;

  return (
    <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mb-4">
      <div
        className="bg-theme h-2.5 rounded-full dark:bg-theme"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default DonationBar;
