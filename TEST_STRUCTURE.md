# 📁 Estructura de Tests Co-ubicados

Este proyecto utiliza **tests co-ubicados** junto al código fuente que prueban.

## 📂 Estructura de Directorios

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── navbar.ts
│   │   │   ├── navbar.html
│   │   │   └── navbar.spec.ts        ✅ Test junto al componente
│   │   ├── user-app/
│   │   │   ├── user-app.ts
│   │   │   ├── user-app.html
│   │   │   └── user-app.spec.ts   ✅ Test junto al componente
│   │   ├── user-form/
│   │   │   ├── user-form.ts
│   │   │   ├── user-form.html
│   │   │   └── user-form.spec.ts   ✅ Test junto al componente
│   │   └── users/
│   │       ├── users.ts
│   │       ├── users.html
│   │       └── users.spec.ts        ✅ Test junto al componente
│   ├── models/
│   │   ├── users.model.ts
│   │   └── users.model.spec.ts     ✅ Test junto al modelo
│   ├── services/
│   │   ├── user.ts
│   │   └── user.spec.ts           ✅ Test junto al servicio
│   ├── store/
│   │   ├── effects/
│   │   │   ├── user.effects.ts
│   │   │   └── user.effects.spec.ts ✅ Test junto al effects
│   │   ├── user.reducer.ts
│   │   ├── user.reducer.spec.ts      ✅ Test junto al reducer
│   │   ├── users.actions.ts
│   │   └── users.actions.spec.ts    ✅ Test junto a las acciones
│   ├── app.spec.ts                ✅ Test junto al app principal
│   └── test-basic.spec.ts          ✅ Test básico de configuración
├── test-setup.ts                  ⚙️ Configuración de tests
└── main.ts
```

## 🏗️ Ventajas de Tests Co-ubicados

### ✅ **Facilidad de Localización**
- Los tests están siempre junto al código que prueban
- Más fácil encontrar y mantener sincronizados
- Reduce el tiempo búsqueda de tests relacionados

### 🔄 **Refactoring Sencillo**
- Al refactorizar el código, el test está inmediatamente visible
- Facilita actualizar los tests simultáneamente
- Promueve mantener tests actualizados

### 🎯 **Contexto Inmediato**
- El contexto del test es obvio por su ubicación
- Los nuevos desarrolladores entienden rápidamente la estructura
- Mejora la mantenibilidad del código

### 📦 **Encapsulación Lógica**
- Cada módulo contiene su propia suite de tests
- Independencia entre componentes
- Mejor organización del proyecto

## 🚀 Comandos Disponibles

```bash
# Ejecutar tests
npm run test              # Watch mode
npm run test:run           # Single run
npm run test:ui           # Interfaz gráfica
npm run test:coverage     # Con cobertura

# Lint y formato
npm run lint              # Verificar código
npm run lint:fix           # Corregir problemas automáticamente
npm run format            # Formatear código
npm run format:check       # Verificar formato
npm run validate          # Validar todo (lint + format + tests)
```

## 📋 Convenciones de Nomenclatura

### **Archivos de Test**
- `{nombre}.spec.ts` - Tests unitarios y de integración
- `{nombre}.test.ts` - Tests funcionales (opcional)

### **Estructura de Tests**
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Configuración antes de cada test
  });

  it('should create component', () => {
    // Tests específicos
  });

  it('should have correct behavior', () => {
    // Comportamiento esperado
  });
});
```

## 🧪 Configuración de Tests

### **Vitest + TypeScript**
```typescript
// vite.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts']
  }
});
```

### **ESLint para Tests**
```javascript
// eslint.config.js
{
  files: ['**/*.spec.ts'],
  languageOptions: {
    globals: {
      'describe': 'readonly',
      'it': 'readonly',
      'expect': 'readonly',
      'vi': 'readonly'
    }
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
```

## 📊 Estado Actual del Proyecto

### ✅ **Tests Funcionando**
- **Basic tests**: 2 tests pasando
- **Model tests**: 5 tests pasando  
- **Service tests**: 4 tests pasando

### 🔄 **Tests Listos para Setup Completo**
- Component tests (requieren Angular Testing Library)
- Store tests (requieren mock NgRx completo)
- Effects tests (requieren setup de RxJS)

### 📈 **Cobertura de Tests**
- 100% cobertura en servicios funcionales
- Tests de modelo cubriendo todas las interfaces
- Estructura completa para expansión

## 🎯 Mejores Prácticas

### **📝 Escribir Tests Descriptivos**
```typescript
// ❌ Mal
it('works', () => {
  expect(result).toBe(true);
});

// ✅ Bien
it('should return true when user is authenticated', () => {
  expect(result).toBe(true);
});
```

### **🎭 Usar Mocks Apropiados**
```typescript
// Mockear dependencias externas
vi.mock('@ngrx/store');
vi.mock('sweetalert2');
```

### **🔄 Tests Independientes**
- Cada test debe funcionar de forma aislada
- No depender del estado de otros tests
- Usar beforeEach para configuración limpia

### **📋 Cubrir Casos Edge**
```typescript
it('should handle empty input', () => {
  // Caso vacío
});

it('should handle null values', () => {
  // Caso nulo
});
```

## 🔧 Extender la Configuración

Para agregar más tests:

1. **Crear archivo `.spec.ts` junto al componente/servicio**
2. **Importar las dependencias necesarias**
3. **Configurar mocks en `test-setup.ts` si es necesario**
4. **Ejecutar `npm run test:run` para verificar**

La estructura está optimizada para desarrollo ágil y mantenibilidad a largo plazo. 🚀