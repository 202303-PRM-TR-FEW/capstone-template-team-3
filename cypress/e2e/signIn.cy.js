Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Sign in page", () => {
  it("should show an error message for an invalid email", () => {
    cy.visit("http://localhost:3000/sign-in");

    cy.get(":nth-child(1) > .bg-accent").type("test@invalid");

    cy.get('[type="submit"]').click();

    cy.get('[role="alert"]').should("contain", "Email is invalid");
  });
});

describe("user sign in", () => {
  it("user can sign in", () => {
    cy.visit("http://localhost:3000/sign-in");
    cy.get(":nth-child(1) > .bg-accent").type("johndoe@gmail.com", {});
    cy.get(".bg-theme > :nth-child(2) > .bg-accent").type("Pass!123", {});
    cy.get('[type="submit"]').click();
    cy.wait(15000);
    cy.location("pathname").should("eq", "/en/profile");
  });
});
