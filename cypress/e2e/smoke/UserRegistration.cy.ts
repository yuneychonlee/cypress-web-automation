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
      .type(userData.keanu.user);
    cy.getByDataLocator('signup-email')
      .click()
      .type(userData.keanu.email);
    cy.getByDataLocator('signup-button')
      .click();

    // Check the registration page is visible
    cy.contains('Enter Account Information');

    // Fill details: Title, Name, Email, Password, Date of birth
    cy.get('#id_gender1').check();
    cy.getByDataLocator('password')
      .click()
      .type(userData.keanu.password);

    cy.getByDataLocator('days').select(userData.keanu.dob.split('/')[1]);
    cy.getByDataLocator('months').select(userData.keanu.dob.split('/')[0]);
    cy.getByDataLocator('years').select(userData.keanu.dob.split('/')[2]);

    // Select checkbox 'Sign up for our newsletter!'
    cy.get('#newsletter').check();

    // Select checkbox 'Receive special offers from our partners!'
    cy.get('#optin').check();

    // Fill mandatory details: First name, Last name, Address, Country, State, City, Zipcode, Mobile Number
    cy.getByDataLocator('first_name')
      .click()
      .type(userData.keanu.firstName);
    cy.getByDataLocator('last_name')
      .click()
      .type(userData.keanu.lastName);
    cy.getByDataLocator('address')
      .click()
      .type(userData.keanu.address);
    cy.getByDataLocator('country').select(userData.keanu.country);
    cy.getByDataLocator('state')
      .click()
      .type(userData.keanu.state);
    cy.getByDataLocator('city')
      .click()
      .type(userData.keanu.city);
    cy.getByDataLocator('zipcode')
      .click()
      .type(userData.keanu.zipcode);
    cy.getByDataLocator('mobile_number')
      .click()
      .type(userData.keanu.mobile)

    // Click 'Create Account button'
    cy.getByDataLocator('create-account').click();

    // Verify that 'ACCOUNT CREATED!' is visible
    cy.getByDataLocator('account-created').contains('Account Created!');

    // Click 'Continue' button
    cy.getByDataLocator('continue-button').click();

    // Verify that 'Logged in as username' is visible
    cy.get(':nth-child(10) > a')
      .contains(' Logged in as')
      .should('have.text', ` Logged in as ${userData.keanu.user}`);

    // Click 'Delete Account' button
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

    // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    cy.getByDataLocator('account-deleted').contains('Account Deleted!');
    cy.getByDataLocator('continue-button').click();
  })
})