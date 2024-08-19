import * as userData from '@fixtures/user.json'

describe('Test user account interactions', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.shop-menu.pull-right').should('be.visible');
  })

  it('Should register a new user account', () => {
    // Go to the sign up page and enter details for registration
    cy.get('.shop-menu').find('a').contains(/Signup/i).click();
    cy.location("pathname").should("equal", "/login")
    cy.contains('New User Signup!').should('be.visible');

    cy.getByDataLocator('signup-name')
      .click()
      .type(userData.keanu.user);
    cy.getByDataLocator('signup-email')
      .click()
      .type(userData.keanu.email);
    cy.getByDataLocator('signup-button')
      .click();

    // TODO: Abstract this section out to a helper function
    cy.contains('Enter Account Information').should('be.visible');
    cy.get('#id_gender1').check();
    cy.getByDataLocator('password')
      .click()
      .type(userData.keanu.password);

    cy.getByDataLocator('days').select(userData.keanu.dob.split('/')[1]);
    cy.getByDataLocator('months').select(userData.keanu.dob.split('/')[0]);
    cy.getByDataLocator('years').select(userData.keanu.dob.split('/')[2]);

    cy.get('#newsletter').check();
    cy.get('#optin').check();

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
      .type(userData.keanu.mobile);

    // Create a new account and verify the username
    cy.getByDataLocator('create-account').click();
    cy.getByDataLocator('account-created')
      .contains('Account Created!').should('be.visible');
    cy.getByDataLocator('continue-button').click();

    cy.get('.shop-menu').find('a')
      .contains(/Logged in as/i)
      .should('contain.text', `${userData.keanu.user}`);

    // Verify that the user is able to log out
    cy.contains('Logout').click();
    cy.contains(/Logged in as/i).should('not.exist');
    cy.contains('Login to your account').should('be.visible');
  })

  it('Should not be able to register with existing email', () => {
    // Go to the sign up page and enter existing user account details
    cy.get('.shop-menu').find('a').contains(/Login/i).click();
    cy.location("pathname").should("equal", "/login")
    cy.contains('New User Signup!').should('be.visible');

    cy.getByDataLocator('signup-name')
      .click()
      .type(userData.keanu.user);
    cy.getByDataLocator('signup-email')
      .click()
      .type(userData.keanu.email);

    // Attempt to register with an existing user
    cy.getByDataLocator('signup-button').click();

    // Verify that an existing user cannot register
    cy.contains('Email Address already exist!').should('be.visible');
  })

  it('Should not be able to log in with incorrect email and password', () => {
    // Go to the sign up page and enter incorrect user account details
    cy.get('.shop-menu').find('a').contains(/Login/i).click();
    cy.location("pathname").should("equal", "/login")
    cy.contains('Login to your account').should('be.visible');
    
    cy.getByDataLocator('login-email')
      .click()
      .type(userData.keanu.email + 'wrong');
    cy.getByDataLocator('login-password')
      .click()
      .type(userData.keanu.password + 'wrong');

    // Attempt to login with incorrect credentials
    cy.getByDataLocator('login-button').click();

    // Verify that incorrect credentials cannot be used for login
    cy.contains('Your email or password is incorrect!').should('be.visible');
  })

  it('Should be able to log in with correct email and password', () => {
    // Go to the sign up page and enter incorrect user account details
    cy.get('.shop-menu').find('a').contains(/Login/i).click();
    cy.location("pathname").should("equal", "/login")
    cy.contains('Login to your account').should('be.visible');

    cy.getByDataLocator('login-email')
      .click()
      .type(userData.keanu.email);
    cy.getByDataLocator('login-password')
      .click()
      .type(userData.keanu.password);

    // Attempt to login with correct credentials
    cy.getByDataLocator('login-button').click();

    // Verify that correct credentials can be used for successful login
    cy.contains(` Logged in as ${userData.keanu.user}`);
  })

  it('Should be able to delete account', () => {
    // Log in as an existing user
    cy.get('.shop-menu').find('a').contains(/Login/i).click();
    cy.location("pathname").should("equal", "/login")
    cy.contains('Login to your account').should('be.visible');

    cy.getByDataLocator('login-email')
      .click()
      .type(userData.keanu.email);
    cy.getByDataLocator('login-password')
      .click()
      .type(userData.keanu.password);
    cy.getByDataLocator('login-button').click();

    // Delete the user account
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

    // Verify that the user account has been deleted
    cy.getByDataLocator('account-deleted').should('contain','Account Deleted!');
  })
})