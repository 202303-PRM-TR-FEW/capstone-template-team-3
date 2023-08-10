import React from 'react'
import DeleteModal from './DeleteModal'

describe('<DeleteModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DeleteModal />)
  })
})