describe('Try to fetch data until proper data will be fetched', () => {
    let counter = 0;
    it('fetches data an checks the result', () => {
        cy.visit('http://localhost:9090/src/index.html');
        cy.intercept('http://localhost:8080', async (req) => {
            const body = counter >= 10 ? {responseText: 'Success'} : {
                responseText:
                    `Failure: ${counter}`
            };
            req.reply({body, delay: 1000})
        }).as('getResponse')

        const asyncCallBackExample = (resolve, reject) => {
            counter++;
            cy.get('[data-cy="button"]').click();
            cy.wait('@getResponse')
            cy.get('[data-cy="result"]').then(resultText => resultText.text() === `New result is Success!` ? resolve(resultText.text()) : reject());
        }

        cy.asyncLoop(asyncCallBackExample).should('eq', 'New result is Success!');
    });
});
