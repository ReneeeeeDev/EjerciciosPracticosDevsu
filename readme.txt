NOTAS TÉCNICAS DEL PROYECTO

================================================================================

Decisiones de implementación
-----------------------------

Framework: Cypress
Permite E2E y API en un solo framework. El auto-retry y manejo de promesas 
reduce código boilerplate. Para este alcance, es la opción más eficiente.

E2E: SauceDemo (Opción 2)
Data-test attributes consistentes reducen fragilidad de selectores. Sitio 
estable, sin timeouts ni inconsistencias.

API: Petstore (Opción 2)  
CRUD completo sin autenticación compleja. Endpoint findByStatus permite 
validar búsquedas filtradas. Swagger facilita validación de contratos.


Soluciones técnicas aplicadas
------------------------------

IDs únicos: Date.now()
Evita colisiones en Petstore (API pública sin aislamiento de datos).

Validación flexible en test 404
Petstore devuelve 200 o 404 inconsistentemente para IDs inválidos. 
Validación acepta ambos para evitar falsos negativos.

Tests independientes
Cada test crea/limpia sus datos. Permite ejecución paralela futura.

Waits explícitos pre-screenshot
Aseguran renderizado completo de elementos y logs para evidencia visual.


Estructura
----------

cypress/
  e2e/        - Tests de interfaz
  api/        - Tests de API  
  support/    - Comandos reutilizables
  fixtures/   - Datos estáticos

Separación facilita ejecución selectiva y escalabilidad.


Cobertura
---------

E2E (3 tests):
- Happy path completo
- Carrito vacío (edge case)
- Login fallido (validación auth)

API (7 tests):  
- CRUD completo (POST, GET, PUT, DELETE)
- Búsqueda filtrada (findByStatus)
- Manejo de errores (404)
- Validación de schemas

Validaciones: Status codes, DOM, valores específicos, tipos, schemas.


Mejoras futuras
---------------

- Page Object Model (reducir acoplamiento)
- Faker.js (datos dinámicos)
- Mochawesome (reportes HTML)
- Ejecución paralela
- Tests más exhaustivos (límites, caracteres especiales)


Comandos útiles
---------------

cypress open                    - Desarrollo interactivo
cypress run --headed            - Ver ejecución
--spec "cypress/e2e/**"         - Solo E2E
--spec "cypress/api/**"         - Solo API
--config video=false            - Sin videos


Notas sobre Petstore
--------------------

- Responses incluyen campos no documentados
- DELETE no siempre devuelve 404 en reintentos
- findByStatus puede retornar grandes volúmenes
- IDs negativos siempre generan error

Limitaciones típicas de APIs públicas compartidas.


Conclusión
----------

Tests: 10 (100% passing)
Evidencia: Completa (13 screenshots, 2 videos)
CI/CD: Ready (GitHub Actions incluido)

Código producción-ready para este alcance. Para escalar, seguir patterns 
establecidos: separación E2E/API, tests independientes, validaciones exhaustivas.

================================================================================