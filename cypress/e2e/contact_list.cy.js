describe('Contact List', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('loads the application and displays basic elements', () => {
    // Check if the app is loaded
    cy.get('#app').should('exist')

    // Check if the search input exists
    cy.get('.contact-list__search-input').should('exist')

    // Check if the "Add New Contact" button exists
    cy.get('.contact-list__dialog-button')
      .should('exist')
      .and('contain', 'Add New Contact')

    // Check if pagination exists
    cy.get('.pagination').should('exist')
    cy.get('.pagination__button').should('have.length', 2)
    cy.get('.pagination__info').should('exist')
  })

  it('allows opening the add contact dialog', () => {
    cy.get('.contact-list__dialog-button').click()
    cy.get('.contact-list__dialog').should('be.visible')
    cy.get('.contact-list__dialog-title').should('contain', 'Add New Contact')
  })

  it('allows closing the add contact dialog', () => {
    cy.get('.contact-list__dialog-button').click()
    cy.get('.contact-list__cancel-button').click()
    cy.get('.contact-list__dialog').should('not.exist')
  })
})