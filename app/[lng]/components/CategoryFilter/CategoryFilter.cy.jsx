import React from "react";
import CategoryFilter from "./CategoryFilter";
import Link from "next/link";

describe("CategoryFilter", () => {
  it("should render five categories with icons and names", () => {
    cy.mount(<CategoryFilter />);
  });
});
