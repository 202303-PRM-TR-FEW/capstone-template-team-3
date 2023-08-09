import React from "react";
import PaymentModal from "./PaymentModal";

describe("PaymentModal", () => {
  // mock the props
  const campaignId = "123";
  const lng = "en";

  // mock the redux store

  it("should render the modal with the title and input fields", () => {
    const store = {
      user: {
        user: {
          id: "456",
        },
      },
    };

    // mock the dispatch function
    const dispatch = cy.stub();

    // mock the router
    const router = {
      push: cy.stub(),
    };

    beforeEach(() => {
      // mount the component with the props and store
      mount(<PaymentModal campaignId={campaignId} lng={lng} />, {
        context: { store, dispatch, router },
      });
    });
    // check if the modal is visible
    cy.get(".modal-background").should("be.visible");

    // check if the title is correct
    cy.get("div.m-2.my-6.text-[32px]").should(
      "have.text",
      "Enter the donation amount:"
    );

    // check if the input fields are present
    cy.get("input[name='donation']").should("exist");
    cy.get("input[name='checkbox']").should("exist");
  });

  it("should close the modal when clicking on the back button", () => {
    // click on the back button
    cy.get("button[type='button']").click();

    // check if the modal is closed
    cy.get(".modal-background").should("not.exist");

    // check if the dispatch function is called with closeModal action
    expect(dispatch).to.be.calledWith(closeModal());
  });

  it("should validate the donation input and show error messages", () => {
    // enter an invalid donation amount (zero or non-numeric)
    cy.get("input[name='donation']").type("0");

    // submit the form
    cy.get("button[type='submit']").click();

    // check if the error message is shown
    cy.get("p[role='alert']").should("have.text", "Donation is invalid");

    // clear the input field
    cy.get("input[name='donation']").clear();

    // leave the donation input empty
    cy.get("input[name='donation']").should("have.value", "");

    // submit the form again
    cy.get("button[type='submit']").click();

    // check if another error message is shown
    cy.get("p[role='alert']").should("have.text", "Donation is required");
  });

  it("should submit the form with valid donation amount and checkbox value", () => {
    // enter a valid donation amount
    cy.get("input[name='donation']").type("100");

    // check the checkbox
    cy.get("input[name='checkbox']").check();

    // submit the form
    cy.get("button[type='submit']").click();

    // check if the dispatch function is called with addUserDonation action
    expect(dispatch).to.be.calledWith(
      addUserDonation({
        currentUserId: "456",
        donation: "100",
        checkbox: true,
        campaignId: "123",
      })
    );

    // check if the dispatch function is called with getCurrentCampaign action
    expect(dispatch).to.be.calledWith(getCurrentCampaign(campaignId));

    // check if the dispatch function is called with closeModal action
    expect(dispatch).to.be.calledWith(closeModal());

    // check if the router push function is called with "/thank-you" path
    expect(router.push).to.be.calledWith("/thank-you");
  });
});
