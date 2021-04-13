function fillInStripeForm() {
  const input = [
    ['cardnumber', '4242424242424242'],
    ['exp-date', '1220'],
    ['cvc', '123'],
    ['postal', '10303']
  ]
  cy.wait(1000)
  cy.get('.__PrivateStripeElement > iframe').each(($element, index, list) => {
    cy.get($element).then(($iframe) => {
      const body = $iframe.contents().find('body')
      cy.wrap(body)
        .find(`input[name=${input[index][0]}]`)
        .type(input[index][1], { delay: 10 })
    })
  })
}

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
    fillInStripeForm()
  //  cy.log('Fills out payment form')
  //  cy.get('input[name="cardnumber"]').type('4242424242424242')
  //  cy.get('input[name="ex-date"]').type('2424')
  //  cy.get('input[name="cvc"]').type('123')
  //  cy.get('input[name="postal"]').type('10303')

   cy.log('Submits payment info')

    // cy.log('Navigates to success page')
  })
});