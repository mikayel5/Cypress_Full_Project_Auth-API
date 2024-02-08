/// <reference types="cypress" />



describe("Alians an invoke ", () => {
    it("Log information of all hair care products ", ()=>{
        cy.visit("https://www.automationteststore.com/")    
         cy.get("a[href*='product/category&path=']").contains("Hair Care").click()

         cy.get('.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnali')
         cy.get('@productThumbnali').its('length').should('be.gt', 5)
         cy.get('@productThumbnali').should('include', 'Seaweed Conditioner')

    })

    it('Validate product thumbnali', ()=>{
        cy.visit('https://www.automationteststore.com/');
        cy.get('.thumbnail').as('productThumbnali')
        cy.get('@productThumbnali').should('have.length', 16)
        cy.get('@productThumbnali').find('.productcart').invoke('attr','title').should('include', 'Add to Cart')
    })


    it.only("Calculate total of normal and sale products", ()=>{
        cy.visit('https://www.automationteststore.com/')
        cy.get('.thumbnail').as('productThumbnali')
        // cy.get('@productThumbnali').find('.oneprice').each(($el,) =>{
        //     cy.log($el.text())
        // })


        cy.get('.thumbnail').find('.oneprice').invoke('text').as('itemPrice')
        cy.get('.thumbnail').find('.pricenew').invoke('text').as('saleItemPrice')


        var itemsTotal = 0
        cy.get('@itemPrice').then($linkText =>{
            var itemPriceTotal = 0
            var itemPrice = $linkText.split('$')
            var i;
            for(i = 0; i< itemPrice.length; i++){
                cy.log(itemPrice[i]);
                itemPriceTotal += Number(itemPrice[i])

            }
            itemsTotal += itemPriceTotal

            cy.log('Non sale price items total: ' + itemsTotal)
        })



        cy.get('@saleItemPrice').then($linkText =>{
            var saleItemPriceTotal = 0;
            var saleItemPrice = $linkText.split('$')
            var i ;

            for(i=0; i < saleItemPrice.length; i++){
                cy.log(saleItemPrice[i])
                saleItemPriceTotal += Number(saleItemPrice[i])
            }
            
            itemsTotal += saleItemPriceTotal
            cy.log('Sale price items total ' + saleItemPriceTotal)
        })
        .then(() =>{

            cy.log('The total price of all products ' + itemsTotal)
            expect(itemsTotal).to.equal(660.51)
        } )
    })
})

