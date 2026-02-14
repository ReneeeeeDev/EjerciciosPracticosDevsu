# 🚀 Guía Rápida de Instalación

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd qa-automation-project
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar las pruebas

**Modo interactivo (recomendado):**
```bash
npm run cypress:open
```

**Modo headless (CI/CD):**
```bash
# Todas las pruebas
npm run test:all

# Solo E2E
npm run test:e2e

# Solo API
npm run test:api
```

## 📋 Prerequisitos

- Node.js 18.x o superior
- npm 9.x o superior

**Verificar instalación:**
```bash
node --version
npm --version
```

## 🔍 Verificación

Después de instalar, verifica que Cypress esté listo:

```bash
npx cypress verify
```

Deberías ver:
```
✔ Verified Cypress! [Path to Cypress]
```

## ❓ Problemas Comunes

### Error: "Cannot find module 'cypress'"
**Solución:**
```bash
rm -rf node_modules
npm install
```

### Error de permisos en Linux/Mac
**Solución:**
```bash
sudo npm install -g npm@latest
```

### Cypress no abre
**Solución:**
```bash
export DISPLAY=:0
npm run cypress:open
```

## 📚 Recursos

- [README completo](readme.txt)
- [Conclusiones](conclusiones.txt)
- [Documentación Cypress](https://docs.cypress.io/)

---

