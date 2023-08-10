import React from 'react'
import Search from './Search'

describe('<Search />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Search />)
  })
})