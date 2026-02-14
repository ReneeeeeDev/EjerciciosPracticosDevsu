// ***********************************************
// Comandos personalizados para el proyecto
// ***********************************************

// Comando para login en SauceDemo
Cypress.Commands.add('loginSauceDemo', (username, password) => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})

// Comando para agregar producto al carrito
Cypress.Commands.add('addProductToCart', (productDataTest) => {
  cy.get(`[data-test="${productDataTest}"]`).click()
})

// Comando para API - crear mascota en Petstore
Cypress.Commands.add('createPet', (petData) => {
  const apiUrl = Cypress.env('apiUrl')
  return cy.request({
    method: 'POST',
    url: `${apiUrl}/pet`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: petData
  })
})

// Comando para API - obtener mascota por ID
Cypress.Commands.add('getPetById', (petId) => {
  const apiUrl = Cypress.env('apiUrl')
  return cy.request({
    method: 'GET',
    url: `${apiUrl}/pet/${petId}`,
    headers: {
      'accept': 'application/json'
    }
  })
})

// Comando para API - actualizar mascota
Cypress.Commands.add('updatePet', (petData) => {
  const apiUrl = Cypress.env('apiUrl')
  return cy.request({
    method: 'PUT',
    url: `${apiUrl}/pet`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: petData
  })
})

// Comando para API - eliminar mascota
Cypress.Commands.add('deletePet', (petId) => {
  const apiUrl = Cypress.env('apiUrl')
  return cy.request({
    method: 'DELETE',
    url: `${apiUrl}/pet/${petId}`
  })
})

// Prevenir excepciones no capturadas (para pruebas)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false previene que Cypress falle el test
  // Solo para demos - en producción, manejar apropiadamente
  return false
})
