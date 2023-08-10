import React from "react";
import LargeCard from "./LargeCard";

describe("LargeCard Component", () => {
  it("should render correctly", () => {
    cy.mount(<LargeCard />);

    cy.get("main").should("exist");
    cy.get(".project-text").should("contain", "Campaign of the week");

    cy.get(".donation-tag").eq(0).should("contain", "Raised:");
    cy.get(".donation-tag").eq(1).should("contain", "Goal:");
  });
});
