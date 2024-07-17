describe('Contact List Pagination', () => {
    beforeEach(() => {
      // Visit the app
      cy.visit('/');
    });
  
    it('should display the correct number of pages', () => {
      // Check that the pagination info displays the correct number of pages
      cy.get('.pagination__info').should('contain.text', 'Page 1 of');
    });
  
    it('should navigate to the next page', () => {
      // Click the next button
      cy.get('.pagination__button')
        .contains('Next')
        .click();
  
      // Verify the page number changes
      cy.get('.pagination__info').should('contain.text', 'Page 2 of');
    });
  
    it('should navigate to the previous page', () => {
      // Go to the second page first
      cy.get('.pagination__button')
        .contains('Next')
        .click();
  
      // Click the previous button
      cy.get('.pagination__button')
        .contains('Previous')
        .click();
  
      // Verify the page number changes back to 1
      cy.get('.pagination__info').should('contain.text', 'Page 1 of');
    });
  
    it('should disable the previous button on the first page', () => {
      // Previous button should be disabled on the first page
      cy.get('.pagination__button')
        .contains('Previous')
        .should('be.disabled');
    });
  
 
  });
  