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
    cy.getByDataLocator('signup-name')
      .click()
      .type(userData.user);
    cy.getByDataLocator('signup-email')
      .click()
      .type(userData.email);
    cy.getByDataLocator('signup-button')
      .click();

    // Check the registration page is visible
    cy.contains('Enter Account Information');

    // Fill details: Title, Name, Email, Password, Date of birth
    cy.get('#id_gender1').check();
    cy.getByDataLocator('password')
      .click()
      .type(userData.password);

    cy.getByDataLocator('days').select(userData.dob.split('/')[1]);
    cy.getByDataLocator('months').select(userData.dob.split('/')[0]);
    cy.getByDataLocator('years').select(userData.dob.split('/')[2]);

    // Select checkbox 'Sign up for our newsletter!'
    cy.get('#newsletter').check();

    // Select checkbox 'Receive special offers from our partners!'
    cy.get('#optin').check();

    // Fill mandatory details: First name, Last name, Address, Country, State, City, Zipcode, Mobile Number
    cy.getByDataLocator('first_name')
      .click()
      .type(userData.firstName);
    cy.getByDataLocator('last_name')
      .click()
      .type(userData.lastName);
    cy.getByDataLocator('address')
      .click()
      .type(userData.address);
    cy.getByDataLocator('country').select(userData.country);
    cy.getByDataLocator('state')
      .click()
      .type(userData.state);
    cy.getByDataLocator('city')
      .click()
      .type(userData.city);
    cy.getByDataLocator('zipcode')
      .click()
      .type(userData.zipcode);
    cy.getByDataLocator('mobile_number')
      .click()
      .type(userData.mobile)

    // Click 'Create Account button'
    cy.getByDataLocator('create-account').click();

    // Verify that 'ACCOUNT CREATED!' is visible
    cy.getByDataLocator('account-created').contains('Account Created!');

    // Click 'Continue' button
    cy.getByDataLocator('continue-button').click();

    // Verify that 'Logged in as username' is visible
    cy.get(':nth-child(10) > a')
      .contains(' Logged in as')
      .should('have.text', ` Logged in as ${userData.user}`);

    // Click 'Delete Account' button
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

    // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.getByDataLocator('account-deleted').contains('Account Deleted!');
    cy.getByDataLocator('continue-button').click();
  })
})