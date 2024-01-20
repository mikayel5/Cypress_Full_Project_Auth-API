/// <reference types="cypress" />


describe("Test Contact Us from via Web", ()=>{
    it("Shuld be able to submit a succsessful submisson via contact us from", ()=>{
        cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
       ///cy.get('#contact-us').click({force: true})
       cy.get('[name="first_name"]').type("Joe");
       cy.get('[name="last_name"]').type("blogs");
       cy.get('[name="email"]').type("joe_blogs123@gmail.com")
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