import React from 'react'
import Loader from './loader'

describe('<Loader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Loader />)
  })
})