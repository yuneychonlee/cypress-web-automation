import * as userData from '@fixtures/user.json'

describe('Check API calls with valid methods', () => {
//     it('GET returns all products list successfully', () => {
//         cy.request('GET','/api/productsList').then(
//             (response) => {
//                 cy.log(response.body)
//                 expect(response.status).to.eq(200)
//             }
//         )
//     })

//     it('POST to search product', () => {
//         cy.request({
//             method: 'POST',
//             url: 'api/searchProduct',
//             form: true,
//             body: {
//                 search_product: 'top'
//             },
//         }).then(
//             (response) => {
//                 const body = JSON.parse(response.body)
//                 expect(body.responseCode).to.eq(200)
//             }
//         )
//     })

//     it('GET returns all brands list successfully', () => {
//         cy.request('GET', '/api/brandsList').then(
//             (response) => {
//                 cy.log(response.body)
//                 expect(response.status).to.eq(200)
//             }
//         )
//     })

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

    it('GET user account detail by email', () => {
        cy.request('GET', `/api/getUserDetailByEmail?email=${userData.keanu.email}`).then(
            (response) => {
                cy.log(response.body)
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(200)
                expect(body.user.name).to.eq(userData.keanu.user)
            }
        )
    })

    it('PUT to update user account', () => {
        cy.request({
            method: 'PUT',
            url: 'api/updateAccount',
            form: true,
            body: { // TODO receive as input
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
                "address2": "Village",
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
