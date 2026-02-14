/// <reference types="cypress" />

describe('API Testing - Petstore CRUD Operations', () => {
  
  const baseUrl = Cypress.env('apiUrl')
  let petId
  const timestamp = Date.now()
  
  // Datos de la mascota
  const petData = {
    id: timestamp,
    category: {
      id: 1,
      name: "Dogs"
    },
    name: "Firulais",
    photoUrls: [
      "https://example.com/photo1.jpg"
    ],
    tags: [
      {
        id: 1,
        name: "friendly"
      }
    ],
    status: "available"
  }

  it('1. Debe añadir una mascota a la tienda (POST)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/pet`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: petData
    }).then((response) => {
      // Validaciones
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
      expect(response.body.name).to.eq('Firulais')
      expect(response.body.status).to.eq('available')
      expect(response.body.category.name).to.eq('Dogs')
      
      // Guardar el ID para los siguientes tests
      petId = response.body.id
      
      // Logs para documentación
      cy.log('>>> Mascota creada exitosamente')
      cy.log(`ID: ${petId}`)
      cy.log(`Nombre: ${response.body.name}`)
      cy.log(`Status: ${response.body.status}`)
      cy.log(`Response: ${JSON.stringify(response.body, null, 2)}`)
      
      // Screenshot del log
      cy.screenshot('API-01-POST-crear-mascota')
    })
  })

  it('2. Debe consultar la mascota ingresada previamente por ID (GET)', () => {
    // Primero crear la mascota
    cy.request('POST', `${baseUrl}/pet`, petData).then((createResponse) => {
      petId = createResponse.body.id
      
      // Ahora buscar la mascota por ID
      cy.request({
        method: 'GET',
        url: `${baseUrl}/pet/${petId}`,
        headers: {
          'accept': 'application/json'
        }
      }).then((response) => {
        // Validaciones
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(petId)
        expect(response.body.name).to.eq('Firulais')
        expect(response.body.status).to.eq('available')
        
        cy.log(`>>> Mascota encontrada`)
        cy.log(`ID: ${response.body.id}`)
        cy.log(`Nombre: ${response.body.name}`)
        cy.log(`Status: ${response.body.status}`)
        cy.log(`Response: ${JSON.stringify(response.body, null, 2)}`)
        cy.screenshot('API-02-GET-consultar-por-id')
      })
    })
  })

  it('3. Debe actualizar el nombre y estatus de la mascota a "sold" (PUT)', () => {
    // Primero crear la mascota
    cy.request('POST', `${baseUrl}/pet`, petData).then((createResponse) => {
      petId = createResponse.body.id
      
      // Datos actualizados
      const updatedPetData = {
        ...createResponse.body,
        name: "Firulais Updated",
        status: "sold"
      }
      
      // Actualizar la mascota
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/pet`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: updatedPetData
      }).then((response) => {
        // Validaciones
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(petId)
        expect(response.body.name).to.eq('Firulais Updated')
        expect(response.body.status).to.eq('sold')
        
        cy.log(`>>> Mascota actualizada`)
        cy.log(`ID: ${response.body.id}`)
        cy.log(`Nuevo nombre: ${response.body.name}`)
        cy.log(`Nuevo status: ${response.body.status}`)
        cy.log(`Response: ${JSON.stringify(response.body, null, 2)}`)
        cy.screenshot('API-03-PUT-actualizar-mascota')
      })
    })
  })

  it('4. Debe consultar la mascota modificada por estatus "sold" (GET)', () => {
    // Primero crear y actualizar la mascota
    cy.request('POST', `${baseUrl}/pet`, petData).then((createResponse) => {
      petId = createResponse.body.id
      
      const updatedPetData = {
        ...createResponse.body,
        name: "Firulais Updated",
        status: "sold"
      }
      
      cy.request('PUT', `${baseUrl}/pet`, updatedPetData).then(() => {
        // Buscar mascotas por estatus "sold"
        cy.request({
          method: 'GET',
          url: `${baseUrl}/pet/findByStatus`,
          qs: {
            status: 'sold'
          },
          headers: {
            'accept': 'application/json'
          }
        }).then((response) => {
          // Validaciones
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('array')
          expect(response.body.length).to.be.greaterThan(0)
          
          // Buscar nuestra mascota en la lista
          const ourPet = response.body.find(pet => pet.id === petId)
          expect(ourPet).to.not.be.undefined
          expect(ourPet.name).to.eq('Firulais Updated')
          expect(ourPet.status).to.eq('sold')
          
          cy.log(`>>> Mascota encontrada en búsqueda por status "sold"`)
          cy.log(`Total de mascotas vendidas: ${response.body.length}`)
          cy.log(`ID de nuestra mascota: ${ourPet.id}`)
          cy.log(`Nombre: ${ourPet.name}`)
          cy.log(`Status: ${ourPet.status}`)
          cy.screenshot('API-04-GET-buscar-por-status')
        })
      })
    })
  })

  it('5. Flujo completo - CRUD de mascota', () => {
    const completePetData = {
      id: Date.now(),
      category: {
        id: 2,
        name: "Cats"
      },
      name: "Michi",
      photoUrls: [
        "https://example.com/michi.jpg"
      ],
      tags: [
        {
          id: 2,
          name: "playful"
        }
      ],
      status: "available"
    }
    
    // CREATE
    cy.request('POST', `${baseUrl}/pet`, completePetData).then((createRes) => {
      expect(createRes.status).to.eq(200)
      const createdPetId = createRes.body.id
      cy.log('>>> CREATE - Mascota creada')
      
      // READ
      cy.request('GET', `${baseUrl}/pet/${createdPetId}`).then((readRes) => {
        expect(readRes.status).to.eq(200)
        expect(readRes.body.name).to.eq('Michi')
        cy.log('>>> READ - Mascota leída')
        
        // UPDATE
        const updateData = { ...readRes.body, name: 'Michi Actualizado', status: 'sold' }
        cy.request('PUT', `${baseUrl}/pet`, updateData).then((updateRes) => {
          expect(updateRes.status).to.eq(200)
          expect(updateRes.body.name).to.eq('Michi Actualizado')
          expect(updateRes.body.status).to.eq('sold')
          cy.log('>>> UPDATE - Mascota actualizada')
          
          // DELETE
          cy.request('DELETE', `${baseUrl}/pet/${createdPetId}`).then((deleteRes) => {
            expect(deleteRes.status).to.eq(200)
            cy.log('>>> DELETE - Mascota eliminada')
            
            // Verificar que ya no existe
            cy.request({
              method: 'GET',
              url: `${baseUrl}/pet/${createdPetId}`,
              failOnStatusCode: false
            }).then((verifyRes) => {
              expect(verifyRes.status).to.eq(404)
              cy.log('>>> VERIFY - Mascota no encontrada (eliminada correctamente)')
              cy.log('Flujo CRUD completo ejecutado exitosamente')
              cy.screenshot('API-05-CRUD-completo')
            })
          })
        })
      })
    })
  })

  it('6. Debe manejar errores - Mascota no encontrada', () => {
    // PRIMERA PRUEBA const nonExistentId = 999999999
    const nonExistentId = -Math.abs(Date.now()) // NO puede existir ID negativo, este test debe devolver un error 

    cy.request({
      method: 'GET',
      url: `${baseUrl}/pet/${nonExistentId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
      cy.log('>>> Error manejado correctamente - Mascota no encontrada')
      cy.log(`Status code: ${response.status}`)
      cy.log(`ID buscado: ${nonExistentId}`)
      cy.screenshot('API-06-error-404-not-found')
    })
  })

  it('7. Debe validar el schema de respuesta al crear mascota', () => {
    cy.request('POST', `${baseUrl}/pet`, petData).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.all.keys('id', 'category', 'name', 'photoUrls', 'tags', 'status')
      expect(response.body.category).to.have.all.keys('id', 'name')
      expect(response.body.photoUrls).to.be.an('array')
      expect(response.body.tags).to.be.an('array')
      
      cy.log('>>> Schema de respuesta validado correctamente')
      cy.log(`Keys validadas: ${Object.keys(response.body).join(', ')}`)
      cy.log(`Response completo: ${JSON.stringify(response.body, null, 2)}`)
      cy.screenshot('API-07-validacion-schema')
    })
  })
})
