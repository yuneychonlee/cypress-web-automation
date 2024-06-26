import * as userData from '@fixtures/user.json'

describe('Check API calls with bad requests', () => {
    it('Checks invalid method POST on products list', () => {
        cy.request('POST', '/api/productsList').then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(405)
                expect(body.message).to.eq("This request method is not supported.")
            }
        )
    })

    it('POST to search product without the parameter', () => {
        cy.request('POST', '/api/searchProduct').then(
            (response) => {
                cy.log(response.body)
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(400)
                expect(body.message).to.eq("Bad request, search_product parameter is missing in POST request.")
            }
        )
    })

    it('Checks invalid method PUT on brands list', () => {
        cy.request('PUT', '/api/brandsList').then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(405)
                expect(body.message).to.eq("This request method is not supported.")
            }
        )
    })

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
