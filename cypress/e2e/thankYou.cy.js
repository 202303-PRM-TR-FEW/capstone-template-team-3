Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("<ThankYouPage />", () => {
  it("redirects to campaigns", () => {
    cy.visit("http://localhost:3000/en/thank-you");
    cy.get(".ty-first-button")
      .click()
      .location("pathname")
      .should("eq", "/en/campaigns");
  });
  it("redirects to my campaigns", () => {
    cy.visit("http://localhost:3000/en/thank-you");
    cy.get(".ty-second-button")
      .click()
      .location("pathname")
      .should("eq", "/en/my-campaigns");
  });
});
