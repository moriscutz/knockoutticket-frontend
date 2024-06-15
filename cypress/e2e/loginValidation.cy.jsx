describe('Login Validation', () => {
    it('checks validation of input boxes', () => {
      
      cy.visit('/login'); 
  
      
      cy.get('form.login-form').submit();
  
      
      cy.url().should('include', '/login');
  
      
      cy.get('.error-message').should('contain', 'Username is required');
      cy.get('.error-message').should('contain', 'Password is required');
    });
  });
  