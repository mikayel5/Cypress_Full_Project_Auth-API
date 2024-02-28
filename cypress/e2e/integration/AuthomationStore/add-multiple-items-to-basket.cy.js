import AutoStore_HomePage_PO from "../../../support/pageObjects/automation_test_store/AutoStore_Homepage_PO.cy";
import AutoStore_HairCare_PO from "../../../support/pageObjects/automation_test_store/AutoStore_HairCare_PO.cy";

/// <reference types="cypress" />

describe("Iterate over elements", () => {
  const autoStore_HomePage_PO =  new AutoStore_HomePage_PO()
  const autoStore_HairCare_PO = new AutoStore_HairCare_PO()
 
    before(function(){
        cy.fixture('products').then(function(data){
            globalThis.data = data
        })
    })
    beforeEach(function () {
      autoStore_HomePage_PO.accesHomepage()
      autoStore_HomePage_PO.clickOn_HairCare_Link()
      
      // cy.visit("https://www.automationteststore.com/");
      // cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    });


    it("Add specific items to basket ", () => {
      autoStore_HairCare_PO.adHairCareProductsToBasket()
      
      // globalThis.data.productName.forEach(function(element){
      //     cy.addProductBasket(element)
      //   })
      //   cy.get('.dropdown-toggle > .fa').click();
    });
  });
  