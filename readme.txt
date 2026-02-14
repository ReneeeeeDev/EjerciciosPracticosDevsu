# 🚀 Proyecto de Automatización QA - E2E y API Testing

Proyecto de automatización de pruebas que incluye:
- **Pruebas E2E** en SauceDemo (Opción 2)
- **Pruebas de API** en Petstore (Opción 2)

Desarrollado con **Cypress v13** - Framework moderno para E2E y API testing.

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Descripción de las Pruebas](#descripción-de-las-pruebas)
- [Reportes](#reportes)
- [Troubleshooting](#troubleshooting)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18.x o superior
  - Descarga: https://nodejs.org/
  - Verifica la instalación: `node --version`

- **npm** versión 9.x o superior
  - Viene incluido con Node.js
  - Verifica la instalación: `npm --version`

- **Git** (para clonar el repositorio)
  - Descarga: https://git-scm.com/
  - Verifica la instalación: `git --version`

---

## ⚙️ Instalación

### Paso 1: Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd qa-automation-project
```

### Paso 2: Instalar dependencias

```bash
npm install
```

Este comando instalará:
- Cypress v13.6.0
- Todas las dependencias necesarias

⏱️ **Tiempo estimado:** 2-3 minutos

### Paso 3: Verificar instalación

```bash
npx cypress verify
```

Deberías ver un mensaje confirmando que Cypress está instalado correctamente.

---

## 📁 Estructura del Proyecto

```
qa-automation-project/
│
├── cypress/
│   ├── e2e/
│   │   └── saucedemo-purchase.cy.js    # Pruebas E2E de SauceDemo
│   │
│   ├── api/
│   │   └── petstore-api.cy.js          # Pruebas API de Petstore
│   │
│   ├── fixtures/                        # Datos de prueba
│   ├── screenshots/                     # Capturas automáticas
│   ├── videos/                          # Videos de ejecución
│   └── support/                         # Comandos y configuraciones
│
├── cypress.config.js                    # Configuración de Cypress
├── package.json                         # Dependencias del proyecto
├── readme.txt                           # Este archivo
└── conclusiones.txt                     # Hallazgos y conclusiones
```

---

## 🏃 Ejecución de Pruebas

### Opción 1: Modo Interactivo (Recomendado para desarrollo)

Abre la interfaz gráfica de Cypress:

```bash
npm run cypress:open
```

Luego:
1. Selecciona "E2E Testing"
2. Elige un navegador (Chrome, Edge, Firefox, etc.)
3. Click en el archivo de prueba que deseas ejecutar

### Opción 2: Modo Headless (Para CI/CD)

#### Ejecutar TODAS las pruebas:

```bash
npm run test:all
```

#### Ejecutar solo pruebas E2E:

```bash
npm run test:e2e
```

#### Ejecutar solo pruebas API:

```bash
npm run test:api
```

#### Ejecutar un archivo específico:

```bash
# Solo E2E de SauceDemo
npx cypress run --spec "cypress/e2e/saucedemo-purchase.cy.js"

# Solo API de Petstore
npx cypress run --spec "cypress/api/petstore-api.cy.js"
```

---

## 🧪 Descripción de las Pruebas

### 🛒 Pruebas E2E - SauceDemo

**Archivo:** `cypress/e2e/saucedemo-purchase.cy.js`

**Escenarios cubiertos:**

1. **Flujo de compra completo exitoso**
   - ✅ Login con credenciales válidas (standard_user / secret_sauce)
   - ✅ Agregar 2 productos al carrito (Backpack y Bike Light)
   - ✅ Visualizar carrito con productos agregados
   - ✅ Completar formulario de checkout (nombre, apellido, código postal)
   - ✅ Revisar resumen de compra
   - ✅ Finalizar compra
   - ✅ Validar mensaje "THANK YOU FOR YOUR ORDER"

2. **Validación de carrito vacío**
   - ✅ Verificar que no se puede hacer checkout sin productos

3. **Validación de credenciales incorrectas**
   - ✅ Verificar mensaje de error con credenciales inválidas

**Tiempo de ejecución:** ~30 segundos

---

### 🐾 Pruebas API - Petstore

**Archivo:** `cypress/api/petstore-api.cy.js`

**Escenarios cubiertos:**

1. **Crear mascota (POST /pet)**
   - ✅ Enviar datos de nueva mascota
   - ✅ Validar status code 200
   - ✅ Validar que se asignó un ID
   - ✅ Validar datos retornados

2. **Consultar mascota por ID (GET /pet/{id})**
   - ✅ Buscar mascota recién creada
   - ✅ Validar que los datos coinciden
   - ✅ Validar status code 200

3. **Actualizar mascota (PUT /pet)**
   - ✅ Cambiar nombre de la mascota
   - ✅ Cambiar status a "sold"
   - ✅ Validar que los cambios se aplicaron

4. **Consultar por status (GET /pet/findByStatus)**
   - ✅ Buscar mascotas con status "sold"
   - ✅ Validar que nuestra mascota aparece en la lista
   - ✅ Validar que el status es correcto

5. **Flujo CRUD completo**
   - ✅ Create → Read → Update → Delete
   - ✅ Verificar eliminación (404)

6. **Manejo de errores**
   - ✅ Validar error 404 para mascota inexistente

7. **Validación de schema**
   - ✅ Validar estructura de respuesta JSON

**Tiempo de ejecución:** ~10 segundos

---

## 📊 Reportes

### Ubicación de Reportes

Después de ejecutar las pruebas, encontrarás:

- **Videos:** `cypress/videos/`
  - Video completo de cada ejecución
  - Solo se generan en modo headless

- **Screenshots:** `cypress/screenshots/`
  - Capturas automáticas en caso de fallos
  - Capturas programadas en el código

### Reportes en Terminal

Al ejecutar en modo headless, verás:
- ✅ Tests pasados
- ❌ Tests fallidos
- ⏱️ Tiempo de ejecución
- 📸 Ubicación de screenshots/videos

### Ver Reportes Detallados

Los logs de Cypress incluyen:
- Request/Response completos para API
- Screenshots de cada paso en E2E
- Mensajes cy.log() personalizados

---

## 🔍 Detalles Técnicos

### Configuración de Cypress

**Archivo:** `cypress.config.js`

```javascript
- Base URL: https://www.saucedemo.com (E2E)
- API URL: https://petstore.swagger.io/v2 (API)
- Viewport: 1280x720
- Video: Habilitado
- Screenshots: Automáticos en fallos
```

### Selectores Utilizados

**E2E (SauceDemo):**
- Data attributes: `[data-test="..."]` (más confiables)
- Class selectors: `.shopping_cart_badge`
- Element selectors: `.title`

**API (Petstore):**
- Endpoints RESTful estándar
- Content-Type: application/json
- Validaciones de schema JSON

---

## 🐛 Troubleshooting

### Problema: "Cypress no se instala"

**Solución:**
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar
rm -rf node_modules
npm install
```

### Problema: "Las pruebas E2E fallan por timeout"

**Solución:**
```bash
# Aumentar el timeout en cypress.config.js
defaultCommandTimeout: 10000
```

### Problema: "Error de red en API tests"

**Solución:**
- Verificar conexión a internet
- Confirmar que https://petstore.swagger.io está accesible
- Revisar firewall/proxy

### Problema: "No se generan videos"

**Solución:**
- Los videos solo se generan en modo headless
- Ejecutar: `npm run test:all`

---

## 📝 Comandos Útiles

```bash
# Abrir Cypress
npm run cypress:open

# Ejecutar todo en headless
npm run test:all

# Solo E2E
npm run test:e2e

# Solo API
npm run test:api

# Ejecutar con navegador específico
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge

# Modo headed (ver ejecución)
npx cypress run --headed

# Sin videos (más rápido)
npx cypress run --config video=false
```

---

## ✅ Checklist de Entrega

- [✓] Pruebas E2E implementadas (SauceDemo)
- [✓] Pruebas API implementadas (Petstore)
- [✓] README con instrucciones
- [✓] Conclusiones documentadas
- [✓] Repositorio en GitHub
- [✓] Código comentado y legible
- [✓] Validaciones implementadas
- [✓] Screenshots y videos configurados

---

## 👤 Autor

Desarrollado por Rene A. Teran G. como parte del proceso de selección QA.

## 📄 Licencia

MIT

---

## 🔗 Referencias

- [Documentación de Cypress](https://docs.cypress.io/)
- [SauceDemo](https://www.saucedemo.com/)
- [Petstore API](https://petstore.swagger.io/)

---
