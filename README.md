# FJ Barbearia — Landing Page

React + Vite + Tailwind landing page for FJ Barbearia, a barbershop with two locations on Rua Padre Anchieta (Monte Castelo, Fortaleza-CE, Brazil).

Live at: https://fj-barbearia.vercel.app

## What's on the page

A single page (`src/App.jsx`) with: hero, about section, a grid of 6 services (haircut, beard, combo, eyebrows, kids' cut, pigmentation), 4 differentiators, a gallery of 8 real photos of the shop with a lightbox, 3 reviews from Instagram, a location picker with an embedded Google Maps map for each address, a contact form and a floating WhatsApp button. Booking is done via WhatsApp (`wa.me`) or through external links to Trinks — there is no custom backend.

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Deploy

Already published on Vercel (Vite framework preset, build `npm run build`, output `dist`). Any push to the default GitHub branch should automatically trigger a new deploy, as long as the Vercel project is connected to the repository.

## Still worth adjusting

- **Domain in `index.html`**: `canonical`, `og:url` etc. still point to `https://www.fjbarbearia.com.br/`, which is not the published domain (`fj-barbearia.vercel.app`). Update these tags once the final domain is decided.
- **GitHub repository description**: the repo's description field is empty — this README alone doesn't show up in the profile's repository list.
- **Service prices**: the service cards use "Consultar valor" ("Ask for price", links to WhatsApp) because there are no confirmed prices. To show fixed prices, edit the `services` array in `src/App.jsx`.
- **Reviews**: the 3 reviews in `reviews` (`src/App.jsx`) appear to have been taken from the barbershop's real Instagram — worth confirming they are still the most recent before keeping them hard-coded.
- **WhatsApp/phone**: current number `(85) 98735-4939`, defined in `PHONE_DIGITS` at the top of `src/App.jsx`.
- **Trinks links**: `TRINKS_LINK_701` and `TRINKS_LINK_666`, also at the top of `src/App.jsx` — confirm they are still the correct booking links for each location.

## Structure

```
├── index.html          # SEO, favicon, Open Graph
├── src/
│   ├── App.jsx          # entire page (all sections)
│   ├── main.jsx          # entry point
│   └── index.css          # Tailwind
├── public/
│   └── favicon.svg
├── tailwind.config.js
└── vite.config.js
```

No backend: the contact form and booking open WhatsApp with a pre-filled message (`wa.me`), no server required.
