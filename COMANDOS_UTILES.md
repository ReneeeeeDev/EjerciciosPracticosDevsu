# 📝 COMANDOS ÚTILES DE CYPRESS

## Ejecución de Pruebas

### Modo Interactivo
```bash
# Abrir Cypress UI
npm run cypress:open

# Con navegador específico
npx cypress open --browser chrome
npx cypress open --browser firefox
npx cypress open --browser edge
```

### Modo Headless (Terminal)
```bash
# Todas las pruebas
npm run test:all

# Solo E2E
npm run test:e2e

# Solo API
npm run test:api

# Archivo específico
npx cypress run --spec "cypress/e2e/saucedemo-purchase.cy.js"
npx cypress run --spec "cypress/api/petstore-api.cy.js"

# Con navegador específico
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser electron

# Modo headed (ver la ejecución)
npx cypress run --headed

# Deshabilitar videos (más rápido)
npx cypress run --config video=false

# Deshabilitar screenshots
npx cypress run --config screenshotOnRunFailure=false
```

## Debugging

```bash
# Ejecutar con logs detallados
DEBUG=cypress:* npm run test:all

# Solo errores de red
DEBUG=cypress:server:request npm run test:all

# Pausar en el primer error
npx cypress run --headed --no-exit
```

## Limpieza

```bash
# Limpiar videos y screenshots
rm -rf cypress/videos cypress/screenshots

# Limpiar node_modules y reinstalar
rm -rf node_modules
npm install

# Limpiar caché de Cypress
npx cypress cache clear
npx cypress install
```

## Instalación y Verificación

```bash
# Instalar dependencias
npm install

# Verificar Cypress
npx cypress verify

# Ver información de Cypress
npx cypress info

# Ver versión
npx cypress version
```

## Reportes

```bash
# Generar reporte (si está configurado)
npm run test:all
# Los videos estarán en: cypress/videos/
# Los screenshots en: cypress/screenshots/

# Ver reportes en navegador
open cypress/videos/
open cypress/screenshots/
```

## Comandos de Desarrollo

```bash
# Formatear código (si tienes prettier)
npx prettier --write "cypress/**/*.js"

# Lint (si tienes eslint)
npx eslint cypress/**/*.js
```

## Configuración

```bash
# Ver configuración actual
npx cypress info

# Cambiar puerto del servidor (si hay conflicto)
# Editar cypress.config.js y agregar:
# port: 8080
```

## Trucos y Tips

```bash
# Ejecutar tests en paralelo (requiere Cypress Dashboard)
npx cypress run --record --parallel

# Ejecutar solo tests que contienen palabra clave
npx cypress run --spec "**/*purchase*.cy.js"

# Generar video solo de tests fallidos
npx cypress run --config video=false --config videoUploadOnPasses=false

# Ejecutar con viewport específico
npx cypress run --config viewportWidth=1920,viewportHeight=1080

# Ejecutar con timeout personalizado
npx cypress run --config defaultCommandTimeout=15000
```

## Variables de Ambiente

```bash
# Usar ambiente diferente
CYPRESS_BASE_URL=http://localhost:3000 npm run test:e2e

# Cambiar API URL
CYPRESS_API_URL=https://api.example.com npm run test:api

# Múltiples variables
CYPRESS_USERNAME=user CYPRESS_PASSWORD=pass npm run test:e2e
```

## Actualización

```bash
# Actualizar Cypress a última versión
npm install --save-dev cypress@latest

# Actualizar todas las dependencias
npm update
```

## Integración Continua (CI)

```bash
# Comando típico para CI
npm ci  # Instala desde package-lock.json
npm run test:all

# Con reporte para CI
npm run test:all -- --reporter json --reporter-options output=results.json
```

## Ayuda

```bash
# Ver ayuda de Cypress
npx cypress help

# Ayuda de comando específico
npx cypress run --help
npx cypress open --help
```

---

## 🔧 Personalización Avanzada

### Crear comando personalizado

Editar `cypress/support/commands.js`:
```javascript
Cypress.Commands.add('login', (username, password) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#submit').click()
})
```

Usar:
```javascript
cy.login('user', 'pass')
```

### Configurar timeout global

Editar `cypress.config.js`:
```javascript
module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000
  }
})
```

---

**Para más información, consulta:**
- [README completo](readme.txt)
- [Documentación oficial de Cypress](https://docs.cypress.io/)
