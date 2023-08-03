// ThankYouPage.test.js

import React from "react";
import { render } from "@testing-library/react";
import ThankYouPage from "./page";

// Mock the useTranslation hook
jest.mock("../../i18n/client", () => ({
  useTranslation: (lng, namespace) => ({
    t: (key) => key, // This will simply return the key as the translation for testing purposes
  }),
}));

test("renders ThankYouPage correctly", () => {
  const { getByText, getByAltText } = render(<ThankYouPage lng="en" />);

  // Make sure the header and sub-normal text are rendered
  expect(getByText("Thank you")).toBeInTheDocument();
  expect(getByText("for supporting us!")).toBeInTheDocument();

  // Make sure the buttons are rendered
  expect(getByText("Make another donation")).toBeInTheDocument();
  expect(getByText("Go to homepage")).toBeInTheDocument();

  // Make sure the image is rendered with the correct alt text
  expect(
    getByAltText("Illustration of a hand holding green hearts near books.")
  ).toBeInTheDocument();
});
