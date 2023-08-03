import React from "react";
import ThankYouPage from "./page";

describe("<ThankYouPage />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ThankYouPage />);
  }),
    it("contains the correct text", () => {
      cy.mount(<ThankYouPage />);
      cy.contains("Make another donation");
    });
});
