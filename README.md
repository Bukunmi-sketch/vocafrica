# Alehra Frontend

React + TypeScript + Vite application for the Alehra telepractice platform.

---

## Naming Conventions & Folder Structure

### General Naming Rules (Golden Rules)

| Category | Convention | Example |
|----------|------------|---------|
| **Folders** | kebab-case / lowercase | `auth`, `authentication`, `admin`, `payment-flow` |
| **React components** | PascalCase (file names) | `LoginForm.tsx`, `Signup2.tsx`, `ManageClient.tsx` |
| **Hooks** | camelCase, prefix `use` | `useAuth.ts`, `useFetchUser.ts` |
| **Utilities / helpers** | camelCase | `formatCurrency.ts` |
| **Constants** | SCREAMING_SNAKE_CASE (names) | `API_ENDPOINTS.ts`, `env.ts` |
| **Types / interfaces** | PascalCase | `User`, `AuthState` |

### Recommended Folder Structure (Feature-Based)

```
src/
├── app/                    # App bootstrap & global config
│   ├── App.tsx
│   ├── main.tsx (entry via src/main.tsx)
│   ├── routes.tsx          # (optional) route definitions
│   └── providers.tsx      # Router, Auth, Sentry, Toaster
│
├── components/             # Shared / reusable UI components
├── hooks/                   # Global reusable hooks
├── config/                 # Config, env constants (env.ts), ProtectedRoute
├── context/                 # React context (e.g. AuthContext)
├── layout/                  # Layout components
├── pages/                   # Page components (by route area); subfolders lowercase (authentication, admin, clients, etc.)
├── services/                # API clients (optional)
├── utils/                   # Pure helpers
├── types/                   # Shared app-wide types
├── assets/                  # Images, icons, fonts
└── css/                     # Global styles
```

### File Naming Patterns

- **Components:** `UserProfile.tsx`, `UserProfile.test.tsx`
- **Enums / types:** PascalCase (match the main export), e.g. `MessageEnum.ts`, `NoteStatus.ts`, `Referral.ts`, `Role.ts`
- **Data / utilities:** camelCase, e.g. `countryPhoneCode.ts`, `countryStateData.ts`
- **Feature entry:** `features/auth/index.ts` (barrel – exports public API)
- **Constants:** `env.ts`, `API_ENDPOINTS.ts` (constant names in SCREAMING_SNAKE_CASE)

### Route Naming

- **URLs:** `/dashboard`, `/settings`, `/payments/history`
- **Route file:** `routes.tsx` (or in `app/`)
- **Page components:** `DashboardPage.tsx`, `PaymentHistoryPage.tsx`

### Environment Files

- `.env`, `.env.local`, `.env.development`, `.env.production`
- Access: `import.meta.env.VITE_API_URL`  
- Constants: `src/config/env.ts` (SCREAMING_SNAKE_CASE exports)

### What to Avoid

- Names like `components2`, `utils-new`
- Mixing snake_case and camelCase
- Deep imports: `../../../../components/Button/Button.tsx`  
  Prefer path alias: `@/components/Button`

### Path Alias

- `@/` resolves to `src/` (e.g. `import X from '@/config/env'`).

---

## Testing

Tests use **Vitest** with **@testing-library/react** and **@testing-library/jest-dom**.

### Commands

- `npm run test` – run tests in watch mode  
- `npm run test:run` – run tests once  
- `npm run test:coverage` – run tests with coverage report  

### Test layout

- `test/utils/` – utils (validation, generateTimeOptions, onboarding)  
- `test/common/` – common components (EmptyState, ErrorState, loader, skeleton-loader)  
- `test/hooks/` – pure hooks/helpers (formatTime, months, folderColor)  
- `test/config/` – config (ProtectedRoute)  
- `test/routes/` – app routes (App)  

### Adding tests

- Use `describe` / `it` and `expect` from Vitest.  
- Use `render`, `screen`, `fireEvent` from `@testing-library/react`.  
- Use matchers like `toBeInTheDocument()` from `@testing-library/jest-dom` (see `test/setup.ts`).  
- Mock `@/context/AuthContext` or `axios` where needed (see `test/utils/onboarding.test.ts`, `test/config/ProtectedRoute.test.tsx`).  

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# -telepracticepro-frontend



# Checking that the docker build works
- docker build -t telepracticepro-frontend .
- docker run -p 8080:8080 telepracticepro-frontend

# Fixing issues with PR

If you are getting the error below in Github CI/CD

```
/home/runner/work/telepracticepro-frontend/telepracticepro-frontend/node_modules/rollup/dist/native.js:64
		throw new Error(
		      ^

Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
    at requireWithFriendlyError (/home/runner/work/telepracticepro-frontend/telepracticepro-frontend/node_modules/rollup/dist/native.js:64:9)
    at Object.<anonymous> (/home/runner/work/telepracticepro-frontend/telepracticepro-frontend/node_modules/rollup/dist/native.js:73:76)
    ... 3 lines matching cause stack trace ...
    at Module._load (node:internal/modules/cjs/loader:1022:12)
    at cjsLoader (node:internal/modules/esm/translators:366:17)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:315:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:222:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:323:24) {
  [cause]: Error: Cannot find module '@rollup/rollup-linux-x64-gnu'
  Require stack:
  - /home/runner/work/telepracticepro-frontend/telepracticepro-frontend/node_modules/rollup/dist/native.js
      at Module._resolveFilename (node:internal/modules/cjs/loader:1143:15)
      at Module._load (node:internal/modules/cjs/loader:984:27)
      at Module.require (node:internal/modules/cjs/loader:1231:19)
      at require (node:internal/modules/helpers:179:18)
      at requireWithFriendlyError (/home/runner/work/telepracticepro-frontend/telepracticepro-frontend/node_modules/rollup/dist/native.js:46:10)
      at Object.<anonymous> (/home/runner/work/telepracticepro-frontend/telepracticepro-frontend/node_modules/rollup/dist/native.js:73:76)
      at Module._compile (node:internal/modules/cjs/loader:1369:14)
      at Module._extensions..js (node:internal/modules/cjs/loader:1427:10)
      at Module.load (node:internal/modules/cjs/loader:1206:32)
      at Module._load (node:internal/modules/cjs/loader:1022:12) {
    code: 'MODULE_NOT_FOUND',
    requireStack: [
      '/home/runner/work/telepracticepro-frontend/telepracticepro-frontend/node_modules/rollup/dist/native.js'
    ]
  }
}
```

Remove node_modules and package-lock.json:
Delete the node_modules directory and the package-lock.json file to ensure a clean slate for reinstalling dependencies.

```
rm -rf node_modules package-lock.json
```

Run npm install to reinstall all dependencies, including the optional ones.

```
npm install
```



sudo docker run -it --rm -p 8080:8080 tpp-spa sh
