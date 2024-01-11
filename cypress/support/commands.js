// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/* promise callback should have the following signature
(resolve, reject) => {
  cy.something();
  cy.something();
  cy.something();
  cy.lastCommand().then(yield => {
    in this 'then' call you need to check if you want to go out of the loop:
    if(condition) {
      everything that will be passed as an argument of the 'resolve' function can be yielded after cy.asyncLoop()
      resolve(yield)
    } else {
      reject()
    }
  })
}

wrapOptions is an optional property, it should be an object with options from cy.wrap
(see more infomration here: https://docs.cypress.io/api/commands/wrap#Yields)

*/

Cypress.Commands.add('asyncLoop', (promiseCallback, wrapOptions) => {
    const generateRecursivePromise = () =>
        new Promise(promiseCallback).catch(() => generateRecursivePromise())

    const promise = generateRecursivePromise();
    cy.wrap(promise, wrapOptions);
});
