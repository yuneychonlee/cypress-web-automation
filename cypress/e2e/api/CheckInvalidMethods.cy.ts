describe('Check API calls with bad requests', () => {
    it('Checks invalid method POST on products list', () => {
        cy.request('POST', 'https://automationexercise.com/api/productsList').then(
            (response) => {
                let body = JSON.parse(response.body)
                expect(response.status).to.eq(200)
                expect(body.responseCode).to.eq(405)
                expect(body.message).to.eq("This request method is not supported.")
            }
        )
    })

    it('Checks invalid method PUT on brands list', () => {
        cy.request('PUT', 'https://automationexercise.com/api/brandsList').then(
            (response) => {
                let body = JSON.parse(response.body)
                expect(response.status).to.eq(200)
                expect(body.responseCode).to.eq(405)
                expect(body.message).to.eq("This request method is not supported.")
            }
        )
    })
})
