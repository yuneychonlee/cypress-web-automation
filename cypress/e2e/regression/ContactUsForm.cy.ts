it('Test the user flow of the Contact Us form', () => {
    cy.visit('/');
    cy.get('.shop-menu.pull-right').should('be.visible');
    
    // Visit Contact Us page
    cy.get('.shop-menu > .nav > :nth-child(8) > a').
    contains(' Contact us').click();
    cy.contains('Get In Touch');

    // Fill required fields
    cy.getByDataLocator('name').type('Tester Bot');
    cy.getByDataLocator('email').type('testerbot@gmail.com');
    cy.getByDataLocator('subject').type('Testing contact us form.');
    cy.getByDataLocator('message').type('This is a test.');

    // TODO Upload file

    // Submit and return to homepage
    cy.getByDataLocator('submit-button').click();
    cy.visit('/');
    cy.get('.shop-menu.pull-right').should('be.visible');
})