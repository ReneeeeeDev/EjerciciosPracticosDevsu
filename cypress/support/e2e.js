// ***********************************************
// Este archivo se procesa y carga automáticamente
// antes de los archivos de prueba.
// ***********************************************

// Importar comandos personalizados
import './commands'

// Configuraciones globales
Cypress.config('defaultCommandTimeout', 10000)
Cypress.config('pageLoadTimeout', 30000)
Cypress.config('requestTimeout', 10000)
Cypress.config('responseTimeout', 30000)

// Logs de inicio
before(() => {
  cy.log(' <<< Iniciando suite de pruebas >>>')
  cy.log(`Ambiente: ${Cypress.config('baseUrl')}`)
})

// Logs de finalización
after(() => {
  cy.log('>>> Suite de pruebas completada')
})
