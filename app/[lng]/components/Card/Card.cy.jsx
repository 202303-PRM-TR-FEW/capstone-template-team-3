import React from "react";
import Card from "./Card";

describe("<Card />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Card />);
  });
  it("gets props", () => {
    cy.mount(<Card title={"Test Title"} />);
    cy.get("h1").should("have.text", "Test Title");
  });
  it("renders donation bar", () => {
    cy.mount(<Card raised={1000} goal={2000} />);
    cy.get(".card-progress-bar").should("have.length", 1);
  });
});
