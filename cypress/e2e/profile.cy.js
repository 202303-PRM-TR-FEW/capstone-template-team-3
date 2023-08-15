Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("directs to kick off modal", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/en/profile");
    cy.get(':nth-child(1) > [data-cy="New campaign"]').click();
    cy.wait(20000);
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
