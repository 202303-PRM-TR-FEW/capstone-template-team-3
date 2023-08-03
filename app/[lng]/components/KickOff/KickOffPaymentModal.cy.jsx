import React from 'react'
import PaymentModal from './KickOff'

describe('<PaymentModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PaymentModal />)
  })
})