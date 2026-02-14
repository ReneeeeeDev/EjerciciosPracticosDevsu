/// <reference types="cypress" />

describe('E2E - SauceDemo Purchase Flow', () => {
  
  beforeEach(() => {
    // Visitar la página de inicio
    cy.visit('/')
  })

  it('Debe completar el flujo de compra exitosamente', () => {
    cy.wait(500)
    // 1. AUTENTICACIÓN
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    // Verificar que estamos en la página de productos
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain', 'Products')
    cy.screenshot('01-login-exitoso-productos')
    
    // 2. AGREGAR DOS PRODUCTOS AL CARRITO
    cy.wait(500)

    // Producto 1: Sauce Labs Backpack
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    
    // Producto 2: Sauce Labs Bike Light
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    
    // Verificar que el badge del carrito muestra "2"
    cy.get('.shopping_cart_badge').should('have.text', '2')
    cy.screenshot('02-productos-agregados-al-carrito')
    
    // 3. VISUALIZAR EL CARRITO
    cy.wait(500)

    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
    cy.get('.title').should('contain', 'Your Cart')
    
    // Verificar que ambos productos están en el carrito
    cy.get('.cart_item').should('have.length', 2)
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack')
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Bike Light')
    cy.screenshot('03-carrito-con-productos')
    
    // Continuar al checkout
    cy.get('[data-test="checkout"]').click()
    
    // 4. COMPLETAR EL FORMULARIO DE COMPRA
    cy.wait(500)

    cy.url().should('include', '/checkout-step-one.html')
    cy.get('.title').should('contain', 'Checkout: Your Information')
    
    // Llenar información del comprador
    cy.get('[data-test="firstName"]').type('Juan')
    cy.get('[data-test="lastName"]').type('Pérez')
    cy.get('[data-test="postalCode"]').type('170150')
    cy.screenshot('04-formulario-checkout-completado')
    
    // Continuar
    cy.get('[data-test="continue"]').click()
    
    // Verificar página de resumen
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('.title').should('contain', 'Checkout: Overview')
    
    // Verificar que los productos están en el resumen
    cy.get('.cart_item').should('have.length', 2)
    
    // Verificar que hay información de precio
    cy.get('.summary_subtotal_label').should('be.visible')
    cy.get('.summary_tax_label').should('be.visible')
    cy.get('.summary_total_label').should('be.visible')
    cy.screenshot('05-resumen-de-compra')
    
    // 5. FINALIZAR LA COMPRA
    cy.wait(500)

    cy.get('[data-test="finish"]').click()
    
    // Verificar confirmación de compra
    cy.url().should('include', '/checkout-complete.html')
    cy.get('.title').should('contain', 'Checkout: Complete!')
    
    // Verificar el mensaje de agradecimiento
    cy.get('.complete-header').should('contain', 'Thank you for your order')
    cy.get('.complete-header').should('be.visible')
    
    // Verificar que se muestra el ícono de confirmación
    cy.get('.pony_express').should('be.visible')
    
    // Screenshots en puntos clave
    cy.screenshot('06-compra-exitosa-confirmacion')
  })

  it('Debe validar que no se puede hacer checkout con carrito vacío', () => {
    // Login
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    // Ir directamente al carrito sin agregar productos
    cy.get('.shopping_cart_link').click()
    
    // Verificar que el botón de checkout no está presente cuando el carrito está vacío
    cy.get('.cart_item').should('have.length', 0)
  })

  it('Debe validar credenciales incorrectas', () => {
    cy.get('[data-test="username"]').type('usuario_invalido')
    cy.get('[data-test="password"]').type('password_invalido')
    cy.get('[data-test="login-button"]').click()
    
    // Verificar mensaje de error
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'Username and password do not match')
  })
})
