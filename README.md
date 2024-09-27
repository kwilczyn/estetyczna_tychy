# Overview
This is a simple, static app I prepared to train my CSS and SCSS skills.

The project was developed following the "Mobile First" approach. The layout adjusts dynamically based on the size of the viewport. Additionally, the top menu bar functions differently in the mobile and desktop versions.

The mobile version hides the navigation buttons in the burger menu to save space (using media queries).

Please note that the top bar hides when a user scrolls down and appears when changing the direction of scrolling. My intention was to avoid using a fixed top bar to maximize the reading space and make it convenient to use even on smaller mobile devices.

Every component for the project (for example, sliders) was prepared from scratch, excluding the map plugin (Google Maps) and plugins from external medical vendors (Znany Lekarz, Proassist).

Dynamic sections (for example, "Rezerwacje") use a custom loading indicator (pure CSS) while waiting for responses from external APIs.

All animations are covered with unit and E2E tests, including different viewport sizes (small smartphone, tablet, desktop).

The mobile version of the layout:
<p align="center">
  <img src="https://github.com/user-attachments/assets/f1ba3f9d-11db-42e9-9c6a-5b295a962baf" alt="Mobile version of the layout" width="30%">
</p>

The desktop version of the layout:
<p align="center">
  <img src="https://github.com/user-attachments/assets/4dae4fa9-d251-4d36-a8f1-0b4cdb51e69d" alt="Desktop version of the layout">
</p>

Please check the app in action using this link: [Live preview](https://kwilczyn.github.io/estetyczna_tychy/)

# Stack
The app was written in **Vanilla JS** and uses the **SCSS** preprocessor.
Everything is wrapped by the **Vite** builder.
Unit tests: **Vitest**
E2E tests: **Playwright**

## Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup
```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Compile and Minify for Production
```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)
```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)
```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e

# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium

# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts

# Runs the tests in UI mode
npm run test:e2e:ui
```
