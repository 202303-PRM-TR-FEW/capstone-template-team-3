Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("the h1 contains the correct text", () => {
    cy.get("h1").contains("Givingly");
  });
  it("the leading sub contains correct text", () => {
    cy.get(".leading-sub-normal").contains(
      "We helped over 3,500 campaigns and causes. Sign in today and get your idea kicked off or support others kick off their amazing campaigns."
    );
  });
});
describe("get started navigates to navigation page", () => {
  it("navigates to the navigation page", () => {
    cy.visit("http://localhost:3000/en/");
    cy.get(".leading-button").click();

    cy.location("pathname").should("equal", "/en/navigation");
  });
});
