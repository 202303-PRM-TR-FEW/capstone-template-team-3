import NavLink from "./NavLink";

describe("<NavLink />", () => {
  it("should render the NavLink component with the given props", () => {
    cy.mount(<NavLink to="/about" name="About" style="text-blue-500" />);

    cy.get("a")
      .should("have.attr", "href", "/about")
      .should("have.class", "text-blue-500")
      .should("contain.text", "About");
  });
});
