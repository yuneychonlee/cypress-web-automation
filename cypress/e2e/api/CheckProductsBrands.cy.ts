describe('Check valid API calls for products and brands', () => {
    it('GET returns all products list successfully', () => {
        cy.request('GET','/api/productsList').then(
            (response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200)
            }
        )
    })

    it('POST to search product', () => {
        cy.request({
            method: 'POST',
            url: 'api/searchProduct',
            form: true,
            body: {
                search_product: 'top'
            },
        }).then(
            (response) => {
                const body = JSON.parse(response.body)
                expect(body.responseCode).to.eq(200)
            }
        )
    })

    it('GET returns all brands list successfully', () => {
        cy.request('GET', '/api/brandsList').then(
            (response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200)
            }
        )
    })
})

describe('Check invalid API calls for products and brands', () => {
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
})