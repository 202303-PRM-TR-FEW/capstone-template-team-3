import React from "react";
import CategoryFilter from "./CategoryFilter";
import Link from "next/link";

describe("CategoryFilter", () => {
  it("should render five categories with icons and names", () => {
    // mount the component with a mock translation function
    cy.mount(<CategoryFilter lng="en" t={(lng, key) => key} />);

    // check that there are five categories
    cy.get(".flex").children().should("have.length", 5);

    // check that each category has an icon and a name
    cy.get(".flex")
      .children()
      .each((category) => {
        cy.wrap(category).find(".icon").should("exist");
      });
  });

  it("should link to the campaigns page with the correct query", () => {
    // mount the component with a mock translation function
    cy.mount(<CategoryFilter lng="en" t={(lng, key) => key} />);

    // check that each category has a link to the campaigns page
  });
});
