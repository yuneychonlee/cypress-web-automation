import * as userData from '@fixtures/user.json'

describe('Register as a new user with fixture data', () => {
  it('Should create a new account and then delete it', () => {
    cy.visit('/');
    cy.get('.shop-menu.pull-right').should('be.visible');

    // Go to the sign up page and check page visibility
    cy.contains(' Signup / Login')
      .click();
    cy.contains('New User Signup!');

    // Enter email and password for registration
    cy.get('[data-qa="signup-name"]')
      .click()
      .type(userData.user);
    cy.get('[data-qa="signup-email"]')
      .click()
      .type(userData.email);
    cy.get('[data-qa="signup-button"]')
      .click();

    // Check the registration page is visible
    cy.contains('Enter Account Information');

    // Fill details: Title, Name, Email, Password, Date of birth
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]')
      .click()
      .type(userData.password);

    cy.get('[data-qa="days"]').select(userData.dob.split('/')[1]);
    cy.get('[data-qa="months"]').select(userData.dob.split('/')[0]);
    cy.get('[data-qa="years"]').select(userData.dob.split('/')[2]);

    // Select checkbox 'Sign up for our newsletter!'
    cy.get('#newsletter').check();

    // Select checkbox 'Receive special offers from our partners!'
    cy.get('#optin').check();

    // Fill mandatory details: First name, Last name, Address, Country, State, City, Zipcode, Mobile Number
    cy.get('[data-qa="first_name"]')
      .click()
      .type(userData.firstName);
    cy.get('[data-qa="last_name"]')
      .click()
      .type(userData.lastName);
    cy.get('[data-qa="address"]')
      .click()
      .type(userData.address);
    cy.get('[data-qa="country"]').select(userData.country);
    cy.get('[data-qa="state"]')
      .click()
      .type(userData.state);
    cy.get('[data-qa="city"]')
      .click()
      .type(userData.city);
    cy.get('[data-qa="zipcode"]')
      .click()
      .type(userData.zipcode);
    cy.get('[data-qa="mobile_number"]')
      .click()
      .type(userData.mobile)

    // Click 'Create Account button'
    cy.get('[data-qa="create-account"]').click();

    // Verify that 'ACCOUNT CREATED!' is visible
    cy.get('[data-qa="account-created"]').contains('Account Created!');

    // Click 'Continue' button
    cy.get('[data-qa="continue-button"]').click();

    // Verify that 'Logged in as username' is visible
    cy.get(':nth-child(10) > a')
      .contains(' Logged in as')
      .should('have.text', ` Logged in as ${userData.user}`);

    // Click 'Delete Account' button
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

    // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.get('[data-qa="account-deleted"]').contains('Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
  })
})