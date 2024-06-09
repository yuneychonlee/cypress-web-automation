it('Register User', () => {
  cy.visit('/');

  // Go to the sign up page and check page visibility
  cy.contains(' Signup / Login')
    .click();
  cy.contains('New User Signup!');

  // Enter email and password for registration
  cy.get('[data-qa="signup-name"]')
    .click()
    .type('tester-reeves');
  cy.get('[data-qa="signup-email"]')
    .click()
    .type('keanu@hollywood.com');
  cy.get('[data-qa="signup-button"]')
    .click();

  // Check the registration page is visible
  cy.contains('Enter Account Information');

  // Fill details: Title, Name, Email, Password, Date of birth
  cy.get('#id_gender1').check();
  cy.get('[data-qa="password"]')
    .click()
    .type('i like to automate tests');

  cy.get('[data-qa="days"]').select('2');
  cy.get('[data-qa="months"]').select('9');
  cy.get('[data-qa="years"]').select('1964');

  // Select checkbox 'Sign up for our newsletter!'
  cy.get('#newsletter').check();

  // Select checkbox 'Receive special offers from our partners!'
  cy.get('#optin').check();

  // Fill mandatory details: First name, Last name, Address, Country, State, City, Zipcode, Mobile Number
  cy.get('[data-qa="first_name"]')
    .click()
    .type('Keanu');
  cy.get('[data-qa="last_name"]')
    .click()
    .type('Reeves');
  cy.get('[data-qa="address"]')
    .click()
    .type('Yorkville Neighbourhood');
  cy.get('[data-qa="country"]').select('Canada');
  cy.get('[data-qa="state"]')
    .click()
    .type('Ontario');
  cy.get('[data-qa="city"]')
    .click()
    .type('Toronto');
  cy.get('[data-qa="zipcode"]')
    .click()
    .type('M4W 1L1');
  cy.get('[data-qa="mobile_number"]')
    .click()
    .type('4371112222')

  // Click 'Create Account button'
  cy.get('[data-qa="create-account"]').click();

  // Verify that 'ACCOUNT CREATED!' is visible
  cy.get('[data-qa="account-created"]').contains('Account Created!');

  // Click 'Continue' button
  cy.get('[data-qa="continue-button"]').click();

  // Verify that 'Logged in as username' is visible
  cy.contains(' Logged in as tester-reeves');

  // Click 'Delete Account' button
  cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

  // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  cy.get('[data-qa="account-deleted"]').contains('Account Deleted!');
  cy.get('[data-qa="continue-button"]').click();
})
