describe('can go to about page', () => {
    it('can go to site', () => {
        cy.visit('www.kodewars.net/#/challenges')
    })
    it('can click create', () => {
        cy.viewport(1600, 660)
        cy.get('.createbutton').click()
    })
    it('can select challenge name input', () => {
        cy.viewport(1600, 660)
        cy.get('.challengenames').click()
    })
    it('can type in input', () => {
        cy.viewport(1600, 660)
        cy.get('.challengenames').type('something here')
    })
    it('can go to about page', () => {
        cy.viewport(1600, 660)
        cy.get('[href="#/about"] > #navbuttons').click()
    })
})
