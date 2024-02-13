/// <reference types="cypress" />


describe("Test Contact Us from via Web", ()=>{
before(function(){
    cy.fixture('example').then(function(data){
        globalThis.data = data;
        cy.log('dddate', data.first_name)
    })
})

    it("Shuld be able to submit a succsessful submisson via contact us from", ()=>{
        cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
       ///cy.get('#contact-us').click({force: true})
       cy.get('[name="first_name"]').type(data.first_name);
       cy.get('[name="last_name"]').type(data.last_name);
       cy.get('[name="email"]').type(data.email)
       cy.get('textarea.feedback-input').type("How can I learn Cypress?")
       cy.get('[type="submit"]').click();
    });


    //if we type it.only , only work second 
    it("Should not be able to sumbit a succesful submission via contact us from as all fields are requeared ",()=>{
        cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.get('[name="first_name"]').type("Tom");
        cy.get('[name="last_name"]').type("blogs");
        cy.get('textarea.feedback-input').type("How can I learn Cypress?")
        cy.get('[type="submit"]').click();
    })
})