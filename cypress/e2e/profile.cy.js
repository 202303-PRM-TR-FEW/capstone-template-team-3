Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe("directs to kick off modal", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/en/profile");
    cy.get(".flex.text-center > :nth-child(1) > .bg-theme").click();
    cy.location("pathname");
    cy.should("equal", "/en/my-campaigns");
    cy.contains("Kick-off your campaign");
  });
});
describe("directs to campaigns page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/en/profile");
    cy.get('[data-cy="Other campaigns"]').click();
    cy.wait(20000);
    cy.location("pathname");
    cy.should("equal", "/en/campaigns");
  });
});
