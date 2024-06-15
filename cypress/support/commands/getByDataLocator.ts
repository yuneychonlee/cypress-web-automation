import { DataLocators } from "../typings/placeholders"
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Get a DOM element based on the data-qa value
             * @param `data-qa` DOM element
             * @example
             * // this command
             * cy.getByDataLocator('signup-name')
             * // will select this element
             * <input data-qa="signup-name" />
             */
            getByDataLocator(input: DataLocators):
            Chainable<any>
        }
    }
}

Cypress.Commands.add('getByDataLocator',
    (input: DataLocators) => {

        Cypress.log({
            displayName: 'getByDataLocator',
            message: input,
            consoleProps() {
                return {
                    selector: input
                }
            }
        })
        return cy.get(`[data-qa="${input}"]`, { log: false })

    }
)