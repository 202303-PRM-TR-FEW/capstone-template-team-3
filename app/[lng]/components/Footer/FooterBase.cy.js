import React from 'react'
import { FooterBase } from './FooterBase'

describe('<FooterBase />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FooterBase />)
  })
})