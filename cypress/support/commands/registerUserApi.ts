import UserDetails from "../typings/userdetails"

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Register a new user via API
             * @param user details of the new user to be registered
             * @example
             * cy.registerUser({
             *   user: 'test_user',
             *   password: 'test_password',
             *   email: 'test_email',
             *   title: 'test_title',
             *   firstName: 'test_first_name',
             *   lastName: 'test_last_name',
             *   dob: 'test_dob',
             *   company: 'test_company',
             *   address: 'test_address',
             *   city: 'test_city',
             *   state: 'test_state',
             *   country: 'test_country',
             *   zipcode: 'test_zipcode',
             *   mobile: 'test_mobile',
             * })
             */
            registerUser(user: UserDetails): Chainable<any>
        }
    }
}

Cypress.Commands.add('registerUser', (user: UserDetails) => {
    Cypress.log({
        displayName: 'Register user by API',
    })
    
    return cy.request({
        method: 'POST',
        url: 'api/createAccount',
        form: true,
        body: {
            "name": user.user,
            "password": user.password,
            "email": user.email,
            "title": user.title,
            "firstname": user.firstName,
            "lastname": user.lastName,
            "birth_date": user.dob.split('/')[1],
            "birth_month": user.dob.split('/')[0],
            "birth_year": user.dob.split('/')[2],
            "company": user.company,
            "address1": user.address,
            "address2": "",
            "city": user.city,
            "state": user.state,
            "country": user.country,
            "zipcode": user.zipcode,
            "mobile_number": user.mobile,
        },
    }).its('body').then((body) => {
        return JSON.parse(body)
    })
})