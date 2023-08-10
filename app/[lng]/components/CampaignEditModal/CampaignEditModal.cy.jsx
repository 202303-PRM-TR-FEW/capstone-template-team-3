import React from 'react'
import CampaignEditModal from './CampaignEditModal'

describe('<CampaignEditModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CampaignEditModal />)
  })
})