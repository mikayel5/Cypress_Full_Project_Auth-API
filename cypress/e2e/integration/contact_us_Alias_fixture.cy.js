/// <reference types="cypress" />


describe("Test Contact Us from via Web", ()=>{
before(function(){
    cy.fixture('userDetalis').as('user')
})

    it("Shuld be able to submit a succsessful submisson via contact us from", ()=>{
        cy.visit("https://www.automationteststore.com/");
       cy.get("a[href$='contact']").click().then(function(linkText){
        cy.log('Click on link usink text' + linkText.text())
       })

       cy.get('@user').then((user)=>{
        cy.get('#ContactUsFrm_first_name').type(user.first_name),
       cy.get('#ContactUsFrm_email').type(user.email);
       })

       
       cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email'),
       cy.get('#ContactUsFrm_enquiry').type('Do you privode additional'),
       cy.get("button[title='Submit']").click()
       cy.get('.mb40 >:nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!')
       cy.log("Test has complete")



    });      
})