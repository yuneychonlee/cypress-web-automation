/// <reference types="cypress" />

it('Test the user flow of the Contact Us form', () => {
    cy.visit('/');
    cy.get('.shop-menu.pull-right').should('be.visible');
    
    // Visit Contact Us page
    cy.get('.shop-menu > .nav > :nth-child(8) > a').
    contains(' Contact us').click();
    cy.contains('Get In Touch');

    // Fill required fields
    cy.get('[data-qa="name"]').type('Tester Bot');
    cy.get('[data-qa="email"]').type('testerbot@gmail.com');
    cy.get('[data-qa="subject"]').type('Testing contact us form.');
    cy.get('[data-qa="message"]').type('This is a test.');

    // Upload file

    // Submit and return to homepage
    cy.get('[data-qa="submit-button"]').click();
    cy.visit('/');
    cy.get('.shop-menu.pull-right').should('be.visible');
})