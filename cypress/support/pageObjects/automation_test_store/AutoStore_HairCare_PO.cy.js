class AutoStore_HairCare_PO {
    adHairCareProductsToBasket(){
        globalThis.data.productName.forEach(function(element){
            cy.addProductBasket(element)
          })
          cy.get('.dropdown-toggle > .fa').click();
    }
    
}
export default AutoStore_HairCare_PO;


