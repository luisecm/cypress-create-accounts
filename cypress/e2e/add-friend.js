const faker = require('faker')
const randomName = faker.internet.userName(name) // generate random name
const randomStatus = faker.lorem.word() // generate random status
const randomPIN = faker.internet.password(7, false, /[A-Z]/, 'test') // generate random PIN

describe('Load Testing - Import Account and Add Friend', () => {
  Cypress._.times(1, () => {
    it('Create Account', () => {
      //Enter PIN screen
      cy.visit('/')
      cy.get('.input').trigger('input').type(randomPIN)
      cy.get('.input-outer > .button').click()

      //Create or Import account selection screen
      cy.contains(
        "We're going to create an account for you. On the next screen, you'll see a set of words. Screenshot this or write it down. This is the only way to backup your account.",
      ).should('be.visible')
      cy.get('.buttons > :nth-child(1)').click()

      //Recovery Seed Screen
      cy.contains('Recovery Seed').should('be.visible')
      cy.contains('I Saved It').should('be.visible')

      //Click on I Saved It button to go to the next screen
      cy.get('.button').last().click()

      //Username and Status Input - Fill and enter to finish
      cy.contains(
        'Customize how the world sees you, choose something memorable.',
      ).should('be.visible')
      cy.get('.input').first().trigger('input').type(randomName)
      cy.get('.input')
        .last()
        .trigger('input')
        .type(randomStatus + '{enter}')

      //Wait until main page is loaded
      cy.get('.user-state > .is-rounded > .satellite-circle').should('exist').then(() => {
        let userID, passphrase
        let myLocalStorage = localStorage.getItem('Satellite-Store')
        myLocalStorage = JSON.parse(myLocalStorage)
        userID = myLocalStorage.accounts.active
        passphrase = myLocalStorage.accounts.phrase
 
        //Write CSV file records with passphrase and userID
        cy.log('User ID is: ' + userID)
        cy.log('Passphrase is: ' + passphrase)
        cy.writeFile('cypress/fixtures/newAccountsPassphrases.csv', userID + ',' + passphrase + '\n',
         {
           encoding: 'ascii',
           flag: 'a+',
         },
        )
      })
    })
  })
})
