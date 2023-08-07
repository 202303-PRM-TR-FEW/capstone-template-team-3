import WelcomePage from "./page";

describe("WelcomePage", () => {
  it("should display the welcome heading", () => {
    cy.mount(<WelcomePage />);
    cy.contains("Supporting great causes made easy");
  });
  it("should display the welcome message", () => {
    cy.contains(
      "We helped over 3,500 campaigns and causes. Sign in today and get your idea kicked off or support others kick off their amazing campaigns."
    );
  });
  it("should display the sign in button", () => {
    cy.contains("Sign in");
  });
});
