describe('Login and Book Event Fight Night', () => {
    it('successfully logs in, books an event, and verifies success message', () => {

      cy.visit('/login'); 

      cy.get('input[name="username"]').type('cypress');
      cy.get('input[name="password"]').type('123');
      cy.get('button[type="submit"]').click();
  
      
      cy.url().should('include', '/'); 
  
     
      cy.contains('More Details').click();
  
      
      cy.contains('Book Event Fight Night').click();
  
      
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
  
      
      cy.contains('Book Event Fight Night').click();
  
      
      cy.get('.Toastify__toast-body').should('contain', 'Booking successful!');
    });
  });
  