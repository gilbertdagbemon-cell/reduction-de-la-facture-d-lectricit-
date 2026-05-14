# AGENTS.md

This document describes the architecture and conventions of the ÉcoWatt project for developers and AI agents.

## Project Overview

ÉcoWatt is a client-side web application for tracking and reducing electricity bills. It uses TanStack Start with file-based routing, Chart.js for data visualization, and localStorage for client-side persistence.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Charts | Chart.js + react-chartjs-2 |
| Icons | Lucide React |
| Persistence | localStorage (client-side) |
| Deployment | Netlify |

## Directory Structure

```
src/
├── lib/
│   └── energy.ts          # Core domain logic: types, localStorage helpers, kWh calculations
├── routes/
│   ├── __root.tsx          # Root layout with sidebar (desktop) and top nav (mobile)
│   ├── index.tsx           # Dashboard: stats cards, bar chart, donut chart, savings panel
│   ├── appareils.tsx       # Appliance manager: add/edit/delete, grouped by category
│   ├── calculateur.tsx     # Bill calculator: tariff selector, budget, savings scenarios
│   └── conseils.tsx        # Energy tips: 20+ tips in 6 categories, filterable by difficulty
└── styles.css              # Tailwind CSS 4 global styles
```

## Key Architectural Decisions

### Data Model (`src/lib/energy.ts`)
All core types and business logic live here:
- `Appliance` — `id`, `name`, `wattage` (W), `hoursPerDay`, `category`
- `UserSettings` — `electricityRate` (€/kWh) and `monthlyBudget` (€)
- `calcMonthlyKwh(appliance)` — `(wattage * hoursPerDay * 30) / 1000`
- `loadAppliances` / `saveAppliances` / `loadSettings` / `saveSettings` — localStorage read/write

### Persistence
Client-side data stored in `localStorage`:
- `ecowatt_appliances` — JSON array of `Appliance`
- `ecowatt_settings` — JSON object of `UserSettings`

Default appliances and settings are seeded on first load.

### Routing
TanStack Router v1 with file-based routes:
- `/` → `routes/index.tsx`
- `/appareils` → `routes/appareils.tsx`
- `/calculateur` → `routes/calculateur.tsx`
- `/conseils` → `routes/conseils.tsx`

`__root.tsx` provides the sidebar/nav shell with `<Link activeProps>` for active state styling.

### Charts
Chart.js components are registered at the top of `index.tsx`. All charts are guarded with a `mounted` state to avoid SSR hydration issues.

## Coding Conventions

- **Language**: TypeScript strict mode, French UI text throughout
- **Brand color**: `bg-green-*` / `text-green-*`
- **State**: `useState` + localStorage (no global state manager needed)
- **Imports**: `@/` alias maps to `src/`
- **Naming**: PascalCase components, camelCase utilities, kebab-case route files

## Adding a New Route

1. Create `src/routes/my-route.tsx`
2. Export `Route = createFileRoute('/my-route')({ component: MyPage })`
3. Add a nav entry in `__root.tsx` `navItems` array

## Development Commands

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build
```
