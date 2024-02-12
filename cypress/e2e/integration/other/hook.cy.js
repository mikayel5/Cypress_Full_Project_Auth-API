describe('Hooks', ()=>{
    before(()=>{
        cy.log("runs onec before all test in the block-1");
    })
    after(()=>{
        cy.log('runs once after all tests in the block-2')
    })

    beforeEach(()=>{
        cy.log('runs before each test in the block-3;')
    })

    afterEach(()=>{
        cy.log('runs after each test in the block-4');
    })


    it('Example test1', ()=>{
        cy.log('Example test11')
    })

    it('Emaple test2',()=>{
        cy.log('Example test22')
    })
})