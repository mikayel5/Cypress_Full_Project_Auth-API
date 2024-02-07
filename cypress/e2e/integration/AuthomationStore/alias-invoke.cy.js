/// <reference types="cypress" />



describe("Alians an invoke ", () => {
    it("Log information of all hair care products ", ()=>{
        cy.visit("https://www.automationteststore.com/")    
         cy.get("a[href*='product/category&path=']").contains("Hair Care").click()

         cy.get('.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnali')
         cy.get('@productThumbnali').its('length').should('be.gt', 5)
         cy.get('@productThumbnali').should('include', 'Seaweed Conditioner')

    })

    it.only('Validate product thumbnali', ()=>{
        cy.visit('https://www.automationteststore.com/');
        cy.get('.thumbnail').as('productThumbnali')
        cy.get('@productThumbnali').should('have.length', 16)
        cy.get('@productThumbnali').find('.productcart').invoke('attr','title').should('include', 'Add to Cart')
    })

})

