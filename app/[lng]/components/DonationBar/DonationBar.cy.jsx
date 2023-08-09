import React from "react";
import DonationBar from "./DonationBar";

describe("DonationBar", () => {
  it("should render a progress bar with the correct width based on the goal and raised props", () => {
    // mount the component with some sample props
    cy.mount(<DonationBar goal={1000} raised={500} />);

    // check that the progress bar is rendered
    cy.get('[data-cy="progressBar"]').should("exist");

    // check that the progress bar has a child element with the correct width and class
    cy.get('[data-cy="progressBar"]')

      .first()
      .should("have.class", "bg-theme")
      .should("have.css", "width", "242px");
  });

  it("should render an error message if the goal or raised props are invalid", () => {
    // mount the component with some invalid props
    cy.mount(<DonationBar goal={"abc"} raised={500} />);

    // check that the error message is rendered
    cy.get("div").should(
      "have.text",
      "Error: Invalid inputError: Invalid input"
    );
  });

  it("should cap the progress bar width at 100% if the raised amount exceeds the goal", () => {
    // mount the component with some sample props
    cy.mount(<DonationBar goal={1000} raised={1500} />);

    // check that the progress bar has a child element with the width of 100%
    cy.get('[data-cy="progressBar"]')
      .first()
      .should("have.class", "bg-theme")
      .and("have.css", "width", "484px");
  });
});
