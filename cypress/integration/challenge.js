describe('can choose a challenge', () => {
    it('can visit the site', () => {
        cy.visit('www.kodewars.net/#/challenges')
        // cy.title().should('include', 'Kode Wars')
    })
    it('can select a challenge', () => {
        cy.get(':nth-child(1) > .list > .namedifficulty > a > .attempt').click()
    })
    it('can run code to test', () => {
        cy.get('.run').click()
    })
    it('can hover menu', () => {
        cy.get('.navsmall > .right-nav > .dropdown > .user-info').trigger('mousever')
    })
    it('can select about tab', () => {
        cy.viewport(1600, 660)
        cy.get('[href="#/about"] > #navbuttons').click()
    })
})