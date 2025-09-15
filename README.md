# Vendora — Multi-Vendor E-Commerce (Demo)

This repository contains a minimal demo of a multi-vendor e-commerce platform built with React + Vite and a MirageJS fake API.

[![CI](https://github.com/Dream-Deploy/Vendora/actions/workflows/ci.yml/badge.svg)](https://github.com/Dream-Deploy/Vendora/actions/workflows/ci.yml)

# Vendora — Multi-Vendor E-Commerce (Demo)

This repository contains a minimal demo of a multi-vendor e-commerce platform built with React + Vite and a MirageJS fake API.

Features
- Vite + React app scaffold
- MirageJS in-memory API (vendors, products, orders)
- Basic pages: Home, Vendor Dashboard, Product page

Getting started (Windows PowerShell)

1) Install dependencies

```powershell
npm install
```

2) Run dev server

```powershell
npm run dev
```

Open http://localhost:5173 in your browser.

Notes
- This is a demo scaffold. MirageJS runs only in development. No production backend is included.
- Expand the API and UI as needed: authentication, vendor onboarding, product CRUD, payments.

TypeScript & Tests

This project includes a minimal TypeScript setup and a sample unit test using Vitest.

Install dev dependencies and run tests:

```powershell
npm install
npm run test
```

Run tests in watch mode:

```powershell
npm run test:watch
```

Run with coverage:

```powershell
npm run test:coverage
```

Vendora — A Multi-Vendor E-Commerce Platform

Smoke test checklist

Quick steps to verify the demo locally:

1. Install and run:

```powershell
npm install
npm run dev
```

2. Open http://localhost:5173

3. Verify authentication:
	- Go to /register, create a user.
	- Go to /login and log in with the same email.

4. Vendor onboarding and product creation:
	- Visit /vendor-signup to create a vendor (this promotes your user to vendor role).
	- After redirect to the vendor dashboard, use the inline "Create product" form to add a product.
	- Confirm the new product appears in the list and is viewable from Home.

5. Tests and CI:
	- Run `npm run test` locally to ensure the unit tests pass.
	- Push to the `main` branch or open a PR to trigger the GitHub Actions workflow (it will run tests and build).

