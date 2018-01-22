import {sel, visitApp, getRandomUserData} from '../utils'
describe('Users', () => {

  it('should allow register a new user', () => {
    const {username, email, password} = getRandomUserData()
    visitApp('/register')

    fillInRegisterDetails({username, email, password})
    cy.get(sel('submit')).click()

    verifyLoggedIn(username)
  })

})

function fillInRegisterDetails({username, email, password}) {
  cy.get(sel('username')).clear().type(username)
  cy.get(sel('email')).clear().type(email)
  cy.get(sel('password')).clear().type(password)
}

// I'll just give you this function :)
// eslint-disable-next-line no-unused-vars
function verifyLoggedIn(username) {
  const hash = Cypress.env('E2E_DEV') ? '#/' : '/'
  cy
    .window()
    .its('localStorage')
    .invoke('getItem', 'jwt')
    .should('not.be.null')
  return cy
    .get(sel('profile-link'))
    .should('contain.text', username)
    .and('have.attr', 'href', `${hash}@${username}`)
}
