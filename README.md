# InsightBoard 📊
**[Live Demo](https://insightboard-alpha.vercel.app)**

A real-time cryptocurrency analytics dashboard built with React, TypeScript, and Tailwind CSS. Displays live market data with role-based views, search/filter functionality, and performance-optimized lazy loading.

## 🚀 Features

- **Live Data**: Fetches real-time crypto prices from the CoinGecko API, auto-refreshing every 30 seconds
- **Interactive Chart**: Visualizes top coin prices using Recharts (line chart)
- **Role-Based Dashboard**: Toggle between "User" and "Admin" views, with admin-only widgets
- **Search & Filter**: Instantly filter coins by name
- **Lazy Loading & Code Splitting**: The coin table component loads asynchronously via `React.lazy()` and `Suspense`, reducing initial bundle size
- **Responsive Design**: Fully responsive layout built with Tailwind CSS

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Axios** for API integration
- **Vite** for fast builds and dev server
- **CoinGecko REST API** for live market data

## 📦 Getting Started

1. Clone the repository:
```bash
   git clone https://github.com/pratiksha-damahe/insightboard-dashboard.git
   cd insightboard-dashboard
```

2. Install dependencies:
```bash
   npm install
```

3. Run the development server:
```bash
   npm run dev
```

4. Open `http://localhost:5173` in your browser

## 🎯 Key Implementation Highlights

- Custom API service layer (`services.ts`) separating data-fetching logic from UI components
- TypeScript interfaces for type-safe API responses
- Component-level code splitting for improved load performance
- Clean, reusable component architecture (`App.tsx`, `CoinTable.tsx`)

## 📝 Author

**Pratiksha Damahe**  
Frontend Developer | React JS & React Native | TypeScript

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
