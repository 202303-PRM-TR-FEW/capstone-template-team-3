import React from "react";
import NavLink from "./NavLink";

describe("NavLink", () => {
  it("should render a link with the given name, to, and style props", () => {
    // mount the component with some sample props
    cy.mount(<NavLink name="Home" to="/" style="text-blue-500" />);

    // check that the link is rendered with the correct attributes and text
    cy.get("a")
      .should("have.attr", "href", "/")
      .and("have.class", "text-blue-500")
      .and("have.text", "Home");
  });

  it("should render any children passed to the component", () => {
    // mount the component with some sample props and children
    cy.mount(
      <NavLink name="Home" to="/" style="text-blue-500">
        <span className="ml-2">🏠</span>
      </NavLink>
    );

    // check that the link has a child element with the correct class and text
    cy.get("a")
      .children()
      .first()
      .should("have.class", "ml-2")
      .and("have.text", "🏠");
  });
});
