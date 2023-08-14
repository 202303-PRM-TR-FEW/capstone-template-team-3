import React from "react";
import Navbar from "./Navbar";

describe("<Navbar />", () => {
  it("renders", () => {
    cy.mount(<Navbar />);
  });
});
