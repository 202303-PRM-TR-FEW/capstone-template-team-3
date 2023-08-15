Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("kickoff modal", () => {
  it("inputs should be visible", () => {
    cy.visit("http://localhost:3000/en/profile");
    cy.get(':nth-child(1) > [data-cy="New campaign"]').click();
    cy.wait(5000);
    cy.get(".gap-3 > :nth-child(1) > .title-input").should("be.visible");
    cy.get(".flex-col.relative > .bg-slate-50").should("be.visible");
    cy.get(".gap-3 > :nth-child(3) > .flex > .title-input").should(
      "be.visible"
    );
  });
});
