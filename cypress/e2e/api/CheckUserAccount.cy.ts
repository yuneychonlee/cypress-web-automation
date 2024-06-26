import * as userData from '@fixtures/user.json'

describe('Check valid API calls for user account activities', () => {
    it('POST to create/register user account', () => {
        cy.request({
            method: 'POST',
            url: 'api/createAccount',
            form: true,
            body: {
                "name": userData.keanu.user,
                "password": userData.keanu.password,
                "email": userData.keanu.email,
                "title": userData.keanu.title,
                "firstname": userData.keanu.firstName,
                "lastname": userData.keanu.lastName,
                "birth_date": userData.keanu.dob.split('/')[1],
                "birth_month": userData.keanu.dob.split('/')[0],
                "birth_year": userData.keanu.dob.split('/')[2],
                "company": userData.keanu.company,
                "address1": userData.keanu.address,
                "address2": "",
                "city": userData.keanu.city,
                "state": userData.keanu.state,
                "country": userData.keanu.country,
                "zipcode": userData.keanu.zipcode,
                "mobile_number": userData.keanu.mobile,
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(201)
                expect(body.message).to.eq('User created!')
            }
        )
    })

    it('POST to verify user account existence with valid email and password', () => {
        cy.request({
            method: 'POST',
            url: 'api/verifyLogin',
            form: true,
            body: {
                email: userData.keanu.email,
                password: userData.keanu.password,
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(200)
                expect(body.message).to.eq('User exists!')
            }
        )
    })

    it('PUT to update user account', () => {
        cy.request({
            method: 'PUT',
            url: 'api/updateAccount',
            form: true,
            body: { 
                "name": userData.keanu.user,
                "password": userData.keanu.password,
                "email": userData.keanu.email,
                "title": userData.keanu.title,
                "firstname": userData.keanu.firstName,
                "lastname": userData.keanu.lastName,
                "birth_date": userData.keanu.dob.split('/')[1],
                "birth_month": userData.keanu.dob.split('/')[0],
                "birth_year": userData.keanu.dob.split('/')[2],
                "company": userData.keanu.company,
                "address1": userData.keanu.address,
                "address2": "Village", // Update the address
                "city": userData.keanu.city,
                "state": userData.keanu.state,
                "country": userData.keanu.country,
                "zipcode": userData.keanu.zipcode,
                "mobile_number": userData.keanu.mobile,
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(200)
                expect(body.message).to.eq('User updated!')
            }
        )
    })

    it('GET user account detail by email', () => {
        cy.request('GET', `/api/getUserDetailByEmail?email=${userData.keanu.email}`).then(
            (response) => {
                cy.log(response.body)
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(200)
                expect(body.user.name).to.eq(userData.keanu.user)
                expect(body.user.address2).to.eq("Village") // verify the updated info
            }
        )
    })

    it('DELETE existing user account', () => {
        cy.request({
            method: 'DELETE',
            url: 'api/deleteAccount',
            form: true,
            body: {
                email: userData.keanu.email,
                password: userData.keanu.password,
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(200)
                expect(body.message).to.eq('Account deleted!')
            }
        )
    })
})

describe('Check invalid API calls for user account activities', () => {
    it('DELETE to verify login', () => {
        cy.request({
            method: 'DELETE',
            url: 'api/verifyLogin',
            form: true,
            body: {
                email: userData.keanu.email,
                password: userData.keanu.password,
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(405)
                expect(body.message).to.eq('This request method is not supported.')
            }
        )
    })

    it('POST to verify login with invalid details', () => {
        cy.request({
            method: 'POST',
            url: 'api/verifyLogin',
            form: true,
            body: { // invalid details
                email: 'nonexistantuser@gmail.com',
                password: 'nonexistantuser',
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(404)
                expect(body.message).to.eq('User not found!')
            }
        )
    })

    it('POST to verify user account existence without email parameter', () => {
        cy.request({
            method: 'POST',
            url: 'api/verifyLogin',
            form: true,
            body: {
                password: userData.keanu.password,
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(400)
                expect(body.message).to.eq('Bad request, email or password parameter is missing in POST request.')
            }
        )
    })
})