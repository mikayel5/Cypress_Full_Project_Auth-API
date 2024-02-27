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

Cypress.Commands.add("selectProduct", (productname) => {
  cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
    if ($el.text().includes(productname)) {
      cy.wrap($el).click();
    }
  });
});

Cypress.Commands.add("addProductBasket", productname => {
  cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
    if ($el.text() ===productname ) {
      cy.log($el.text())
      cy.get('.productcart').eq(index).click()
    }
  });
});



Cypress.Commands.add("webdriverUni_ContactForm_Submission", (first_name, last_name, email, comment, $selector, textTolocate) =>{
cy.get('[name="first_name"]').type(first_name);
cy.get('[name="last_name"]').type(last_name);
cy.get('[name="email"]').type(email)
cy.get('textarea.feedback-input').type(comment)
cy.get('[type="submit"]').click();
cy.get($selector).contains(textTolocate)

})


// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
