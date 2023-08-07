import React from "react";
import PaymentModal from "./KickOff";

import { Provider } from "react-redux";
import { store } from "@/app/lib/redux/store";

Cypress.Commands.add("mount", (component, options = {}) => {
  // Use the default store if one is not provided
  const { reduxStore = store, ...mountOptions } = options;

  const wrapped = <Provider store={reduxStore}>{component}</Provider>;

  return cy.mount(wrapped, mountOptions);
});

describe("<PaymentModal />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PaymentModal />);
  });
});
