// Import the NavLink component
import NavLink from "./NavLink";

// Define the test suite
describe("<NavLink />", () => {
  // Define the test case for rendering the NavLink component
  it("should render the NavLink component with the given props", () => {
    // Mount the NavLink component with some props
    cy.mount(<NavLink to="/about" name="About" style="text-blue-500" />);

    // Assert that the link element has the expected attributes and text
    cy.get("a")
      .should("have.attr", "href", "/about")
      .should("have.class", "text-blue-500")
      .should("contain.text", "About");
  });
});
