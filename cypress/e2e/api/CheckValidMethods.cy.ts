describe('Check API calls with valid methods', () => {
    it('GET returns all products list successfully', () => {
        cy.request('GET','https://automationexercise.com/api/productsList').then(
            (response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200)
            }
        )
    })

    it('GET returns all brands list successfully', () => {
        cy.request('GET', 'https://automationexercise.com/api/brandsList').then(
            (response) => {
                cy.log(response.body)
                expect(response.status).to.eq(200)
            }
        )
    })
})
