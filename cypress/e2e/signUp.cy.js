Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("User Sign Up Form", () => {
  it("rejects invalid name input", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('[data-cy="name-input"]').type("123", { force: true });
    cy.get('[data-cy="email-input"]').type("johndoe@gmail.com", {
      force: true,
    });
    cy.get('[data-cy="password-input"]').type("Pass!123", { force: true });
    cy.get('[data-cy="passwordConfirm-input"]').type("Pass!123", {
      force: true,
    });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="submit"]').click({ force: true });
    cy.contains("Name is invalid").should("be.visible");
  });
});

describe("User Sign Up Form", () => {
  it("rejects invalid email input", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('[data-cy="name-input"]').type("John", { force: true });
    cy.get('[data-cy="email-input"]').type("johndoe@com", {
      force: true,
    }); // invalid email
    cy.get('[data-cy="password-input"]').type("Pass!123", { force: true });
    cy.get('[data-cy="passwordConfirm-input"]').type("Pass!123", {
      force: true,
    });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="submit"]').click({ force: true });
    cy.contains("Email is invalid").should("be.visible");
  });
});

describe("User Sign Up Form", () => {
  it("rejects invalid password input", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('[data-cy="name-input"]').type("John", { force: true });
    cy.get('[data-cy="email-input"]').type("johndoe@gmail.com", {
      force: true,
    });
    cy.get('[data-cy="password-input"]').type("pass123", { force: true });
    cy.get('[data-cy="passwordConfirm-input"]').type("pass123", {
      force: true,
    });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="submit"]').click({ force: true });
    cy.contains("Password must be at least 8 characters").should("be.visible");
  });
});

describe("User Sign Up Form", () => {
  it("rejects mismatched password confirmation input", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('[data-cy="name-input"]').type("John", { force: true });
    cy.get('[data-cy="email-input"]').type("johndoe@gmail.com", {
      force: true,
    });
    cy.get('[data-cy="password-input"]').type("Pass!123", { force: true });
    cy.get('[data-cy="passwordConfirm-input"]').type("Pass!456", {
      force: true,
    });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="submit"]').click({ force: true });
    cy.contains("Passwords do not match").should("be.visible");
  });
});

describe("User Sign Up Form", () => {
  it("rejects unchecked checkbox input", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('[data-cy="name-input"]').type("John", { force: true });
    cy.get('[data-cy="email-input"]').type("johndoe@gmail.com", {
      force: true,
    });
    cy.get('[data-cy="password-input"]').type("Pass!123", { force: true });
    cy.get('[data-cy="passwordConfirm-input"]').type("Pass!123", {
      force: true,
    });

    cy.get('[type="submit"]').click({ force: true });
    cy.contains("You must accept the Terms & Conditions to proceed.").should(
      "be.visible"
    );
  });
});

describe("User Sign Up Form", () => {
  it("allow users to sign up", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('[data-cy="name-input"]').type("John", { force: true });
    cy.get('[data-cy="email-input"]').type("johndoe@gmail.com", {
      force: true,
    });
    cy.get('[data-cy="password-input"]').type("Pass!123", { force: true });
    cy.get('[data-cy="passwordConfirm-input"]').type("Pass!123", {
      force: true,
    });
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="submit"]').click({ force: true });
  });
});
