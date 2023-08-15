Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("should render CampaignEditModal", () => {
  it("renders component and input fields", () => {
    cy.visit("localhost:3000/en/my-campaigns");
    cy.get('[data-cy="campaign-card"]').click();
    cy.wait(10000);
    cy.get('[data-cy="Edit"]').should("be.visible");
    cy.get('[data-cy="Cancel"]').should("be.visible");
  });
});
