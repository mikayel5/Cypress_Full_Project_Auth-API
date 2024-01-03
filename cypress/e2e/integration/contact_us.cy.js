/// <reference types="cypress" />


describe("Test Contact Us from via Web", ()=>{
    it("Shuld be able to submit a succsessful submisson via contact us from", ()=>{
        cy.visit("https://www.webdriveruniversity.com/")
        cy.get('#contact-us').click()
    });


    it("Should not be able to sumbit a succesful submission via contact us from as all fields are requeared ",()=>{
        //cypress code 
    })
})