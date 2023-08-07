// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/signin')
    cy.contains('h1', 'Connexion')
  })
})
