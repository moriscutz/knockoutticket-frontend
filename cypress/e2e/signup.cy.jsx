describe('User Registration', () => {
  it('should register a new user', () => {
    cy.visit('/signup'); 

    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');
  });
});
