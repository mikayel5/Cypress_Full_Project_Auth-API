class HomePage_PO{
    visitHompage(){
        cy.visit(Cypress.env('webdriver_homepage'))
    }

    clickOn_ContactUs_Button(){
        cy.get('#contact-us').invoke('removeAttr', 'target').click({force:true})
    }

}

export default HomePage_PO