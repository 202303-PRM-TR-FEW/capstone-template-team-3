Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe("navigates to created campaign page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/en/my-campaigns");
    cy.get(":nth-child(2) > :nth-child(1) > .card-main").click();
    cy.location("pathname").should(
      "equal",
      "/en/campaigns/nldCFQ6vayPurQJShdOU"
    );
  });
});
describe("navigates to supported campaign page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/en/my-campaigns");
    cy.get(":nth-child(4) > :nth-child(1) > .card-main").click();
    cy.location("pathname").should(
      "equal",
      "/en/campaigns/ocHFvCCqpGpCCprbi2xS"
    );
  });
});
