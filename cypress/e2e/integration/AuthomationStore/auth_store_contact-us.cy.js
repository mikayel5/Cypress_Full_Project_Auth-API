/// <reference types="cypress" />
require('cypress-xpath');


describe("Test Contact Us form via Automation Test Store", () => {
    it("Should be able to submit a successful submission via contact us form", () => {
        cy.visit("https://www.automationteststore.com/");
      //  cy.get("a[href$='contact']").click();
        cy.xpath('//*[@id="footer"]/footer/section[2]/div/div[1]/div/ul/li[5]/a').click();
        cy.get('#ContactUsFrm_first_name').type("Joe");
        cy.get('#ContactUsFrm_email').type("joe_blogs123@gmail.com");
        cy.get('#ContactUsFrm_enquiry').type("Do you provide additional discount on bulk orders?")
        cy.get("button[title='Submit']").click(); 
    });
})

//*