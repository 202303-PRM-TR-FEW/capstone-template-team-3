const { default: PaymentModal } = require("./PaymentModal");

describe("renders", () => {
  it("renders", () => {
    cy.mount(<PaymentModal />);
  });
});
