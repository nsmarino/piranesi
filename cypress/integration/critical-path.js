describe('Critical Path', () => {
  it('should add a product to the cart', () => {
    cy.visit('/');

    cy.log('Adds item to cart');
    cy.get('.addBtn').first().scrollIntoView().click()

    cy.log('Opens cart');
    cy.get('#cartToggle').click()

    cy.log('Cart contains item')
    cy.get('#cart').findByText('Three of Clovers')
  });

  it('should navigate to checkout page', () => {
    cy.contains('Checkout').click().wait(1000)
    cy.contains('Shipping')
      .should('be.visible')
    cy.contains('Order Info')
      .should('be.visible')
  })
  it('fills out shipping form', () => {
    cy.get('input[name="name"]').type('Test Customer')
    cy.get('input[name="address1"]').type('9205 Cedarwood Court')
    cy.get('input[name="city"]').type('New York')
    cy.get('input[name="zip"]').type('10303')
    cy.get('select[name="state_code"]').select('NY')
    cy.get('input[name="email"]').type('customer@test.com')
    
    cy.log('Submit shipping form to calculate fees')
    cy.contains('Calculate shipping fees').click()
  })
  
  it('fills out payment info', () => {
    cy.get('#card-element').within(() => {
      cy.fillElementsInput('cardNumber', '4242424242424242');
      cy.fillElementsInput('cardExpiry', '1025'); // MMYY
      cy.fillElementsInput('cardCvc', '123');
      cy.fillElementsInput('postalCode', '10303');
    });

    cy.log('Submits payment info')
    cy.contains('Submit order').click().wait(1000)

    cy.log('Navigates to success page')
    cy.contains('Congratulations, your order is on its way.')

  })
});