import React from "react";
import Card from "./Card";

describe("<Card />", () => {
  it("renders", () => {
    cy.mount(<Card />);
  });
  it("gets props", () => {
    cy.mount(<Card title={"Test Title"} />);
    cy.get("h1").should("have.text", "Test Title");
  });
});
