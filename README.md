# Proyecto de Automatización QA - E2E & API Testing

Proyecto de automatización de pruebas que incluye pruebas End-to-End y pruebas de API REST desarrollado con Cypress.

---

## Tabla de Contenidos

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Pruebas Implementadas](#pruebas-implementadas)
- [Reportes](#reportes)
- [Documentación](#documentación)

---

## Acerca del Proyecto

Este proyecto automatiza dos tipos de pruebas:

### Pruebas E2E - SauceDemo
Automatización del flujo completo de compra en SauceDemo:
- Autenticación de usuario
- Agregar productos al carrito
- Proceso de checkout
- Confirmación de compra

### Pruebas API - Petstore
Pruebas de operaciones CRUD en Petstore API:
- Crear mascotas (POST)
- Consultar mascotas (GET)
- Actualizar mascotas (PUT)
- Eliminar mascotas (DELETE)
- Búsqueda por status

---

## Tecnologías Utilizadas

- **Framework:** Cypress 13.6.0
- **Lenguaje:** JavaScript (ES6+)
- **CI/CD:** GitHub Actions
- **Reportes:** Screenshots y Videos automáticos

---

## Instalación

### Prerequisitos

- Node.js 18.x o superior
- npm 9.x o superior

### Pasos de instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd qa-automation-project

# Instalar dependencias
npm install

# Verificar instalación de Cypress
npx cypress verify
```

---

## Ejecución de Pruebas

### Modo Interactivo

Para desarrollo y debugging:

```bash
npm run cypress:open
```

Luego:
1. Selecciona "E2E Testing"
2. Elige un navegador
3. Click en el test a ejecutar

### Modo Headless

Para CI/CD y ejecución automatizada:

```bash
# Ejecutar todas las pruebas
npm run test:all

# Solo pruebas E2E
npm run test:e2e

# Solo pruebas API
npm run test:api

# Ejecutar un archivo específico
npx cypress run --spec "cypress/e2e/saucedemo-purchase.cy.js"
npx cypress run --spec "cypress/api/petstore-api.cy.js"
```

### Opciones adicionales

```bash
# Con navegador específico
npx cypress run --browser chrome

# Modo headed (ver la ejecución)
npx cypress run --headed

# Sin videos (ejecución más rápida)
npx cypress run --config video=false
```

---

## Estructura del Proyecto

```
qa-automation-project/
│
├── cypress/
│   ├── e2e/
│   │   └── saucedemo-purchase.cy.js    # Pruebas E2E
│   │
│   ├── api/
│   │   └── petstore-api.cy.js          # Pruebas API
│   │
│   ├── fixtures/
│   │   └── testData.json                # Datos de prueba
│   │
│   ├── support/
│   │   ├── commands.js                  # Comandos personalizados
│   │   └── e2e.js                       # Configuración global
│   │
│   ├── screenshots/                     # Capturas automáticas
│   └── videos/                          # Videos de ejecución
│
├── .github/
│   └── workflows/
│       └── cypress.yml                  # CI/CD GitHub Actions
│
├── cypress.config.js                    # Configuración de Cypress
├── package.json                         # Dependencias
├── readme.txt                           # Instrucciones detalladas
└── conclusiones.txt                     # Hallazgos y análisis
```

---

## Pruebas Implementadas

### Pruebas E2E - SauceDemo

**Total de tests:** 3

1. **Flujo de compra completo**
   - Login con credenciales válidas
   - Agregar 2 productos al carrito (Backpack y Bike Light)
   - Visualizar carrito
   - Completar formulario de checkout
   - Finalizar compra
   - Validar mensaje de confirmación

2. **Validación de carrito vacío**
   - Verificar comportamiento sin productos en el carrito

3. **Validación de credenciales incorrectas**
   - Verificar mensaje de error con login fallido

**Tiempo de ejecución:** Aproximadamente 30 segundos

### Pruebas API - Petstore

**Total de tests:** 7

1. **Crear mascota** - POST /pet
   - Validar status code 200
   - Validar asignación de ID
   - Validar datos retornados

2. **Consultar mascota por ID** - GET /pet/{id}
   - Validar búsqueda exitosa
   - Validar coincidencia de datos

3. **Actualizar mascota** - PUT /pet
   - Cambiar nombre
   - Cambiar status a "sold"
   - Validar actualización exitosa

4. **Consultar por status** - GET /pet/findByStatus
   - Buscar mascotas con status "sold"
   - Validar filtrado correcto

5. **Flujo CRUD completo**
   - Create → Read → Update → Delete
   - Verificar eliminación

6. **Manejo de errores**
   - Validar error 404 para mascota inexistente

7. **Validación de schema**
   - Validar estructura de respuesta JSON

**Tiempo de ejecución:** Aproximadamente 10 segundos

---

## Reportes

### Videos y Screenshots

Los reportes se generan automáticamente en modo headless:

**Videos:** `cypress/videos/`
- Grabación completa de cada suite de tests
- Formato MP4
- Solo en ejecución headless

**Screenshots:** `cypress/screenshots/`
- Capturas automáticas en caso de fallos
- Capturas programadas en el código
- Formato PNG

### Logs en Terminal

La ejecución en terminal muestra:
- Tests ejecutados
- Tests pasados/fallidos
- Tiempo de ejecución
- Ubicación de videos y screenshots

---

## Documentación

- **readme.txt** - Instrucciones completas paso a paso
- **conclusiones.txt** - Hallazgos, métricas y lecciones aprendidas
- **INSTALLATION_GUIDE.md** - Guía rápida de instalación
- **COMANDOS_UTILES.md** - Comandos útiles de Cypress

---

## Configuración

### Cypress Configuration

```javascript
baseUrl: 'https://www.saucedemo.com'
apiUrl: 'https://petstore.swagger.io/v2'
viewportWidth: 1280
viewportHeight: 720
video: true
screenshotOnRunFailure: true
```

### Scripts NPM

```json
{
  "test:e2e": "cypress run --spec 'cypress/e2e/**/*.cy.js'",
  "test:api": "cypress run --spec 'cypress/api/**/*.cy.js'",
  "test:all": "cypress run",
  "cypress:open": "cypress open"
}
```

---

## Notas Adicionales

- SauceDemo es un sitio de práctica estable y confiable
- Petstore API es la API oficial de Swagger para demos
- Los tests son independientes y pueden ejecutarse en cualquier orden
- Se recomienda ejecutar en modo headless para CI/CD

---

## Recursos

- [Documentación de Cypress](https://docs.cypress.io/)
- [SauceDemo](https://www.saucedemo.com/)
- [Petstore API](https://petstore.swagger.io/)

---

## Licencia

MIT
