import React from "react";
import Button from "./Button";

describe("<Button />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button />);
  });
  it("should render children element", () => {
    cy.mount(<Button>Donate!</Button>);
    cy.get("button").should("have.text", "Donate!");
  });
  it("should render props", () => {
    cy.mount(<Button name={"Make a Donation!"} />);
    cy.get("button").should("have.text", "Make a Donation!");
  });
});
