/// <reference types="cypress" />



describe("Inspect Authomation test Store items using chain of commands", () => {
    it("Click on the first istem using header", ()=>{
        cy.visit("https://www.automationteststore.com/");
        cy.get('#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .fixed_wrapper > .fixed > .prdocutname').click();
    })

    it.only("Click on the first istem using header", ()=>{
        // cy.visit("https://www.automationteststore.com/");
        // cy.get('.prdocutname').contains('Total Moisture Facial Cream').click().then

        cy.get('.prdocutname').contains('Total Moisture Facial Cream').click().then(function(itemHeaderText){
            console.log("Selected the following item: " + itemHeaderText.text())
        })
    })

    it("Click on the first istem using header", ()=>{
        cy.visit("https://www.automationteststore.com/");
        cy.get('.fixed_wrapper').find('.prdocutname').eq(3).click()
    })
})

