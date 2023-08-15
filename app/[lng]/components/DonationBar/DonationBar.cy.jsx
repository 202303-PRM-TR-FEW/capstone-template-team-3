import React from "react";
import DonationBar from "./DonationBar";

describe("DonationBar", () => {
  it("should render a progress bar with the correct width based on the goal and raised props", () => {
    cy.mount(<DonationBar goal={1000} raised={500} />);

    cy.get('[data-cy="progressBar"]').should("exist");

    cy.get('[data-cy="progressBar"]')

      .first()
      .should("have.class", "bg-theme")
      .invoke("attr", "style")
      .should("contain", "width: 50%");
  });

  it("should render an error message if the goal or raised props are invalid", () => {
    cy.mount(<DonationBar goal={"abc"} raised={500} />);

    cy.get("div").should(
      "have.text",
      "Error: Invalid inputError: Invalid input"
    );
  });

  it("should cap the progress bar width at 100% if the raised amount exceeds the goal", () => {
    cy.mount(<DonationBar goal={1000} raised={1500} />);

    cy.get('[data-cy="progressBar"]')
      .first()
      .should("have.class", "bg-theme")
      .invoke("attr", "style")
      .should("contain", "width: 100%");
  });
});
