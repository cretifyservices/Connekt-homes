# Connekt Homes – React + Vite Web Application

A premium, production-ready serviced apartment booking platform for **Connekt Homes** (`@connekt_homes`) in Bandra West & Pali Village, Mumbai. Built with React 19, Vite, TypeScript, Tailwind CSS 4, and an Express production server.

## Features Included
- **Complete Booking Engine**: Search dates, guest stepper, pricing engine (nightly rate × nights + housekeeping + 18% GST - 15% CONNEKT15 promo code).
- **12+ Full Pages**:
  - `#/` Home (with 14 editorial sections: Hero, Pillars, A Day at Connekt, Amenities, Interactive Map, Reviews, etc.)
  - `#/stays` Stays Catalog with filter sidebar (price range, layout, amenities) and interactive split-map
  - `#/stay/:id` Detailed stay overview with photo lightbox gallery, sleeping arrangements, house rules, sticky booking card
  - `#/checkout` 3-step checkout with mock ID upload, concierge extras, payment methods, sticky summary
  - `#/confirmed` Booking confirmation with booking reference, .ics calendar export, WhatsApp sharing
  - `#/experiences` Bandra neighborhood guide (Cafes, Promenades, Heritage, Boutiques)
  - `#/corporate` Corporate & long stays with inquiry form
  - `#/list` Property owner onboarding with interactive earnings yield simulator
  - `#/about`, `#/careers`, `#/contact`, `#/policies`, `#/404`
- **Global Features**: Wishlist drawer, Compare up to 3 stays modal, Floating WhatsApp concierge with prefilled message.
- **Pre-Compiled Distribution**: The `./dist` folder is included so you can deploy immediately to any static web hosting (Hostinger, Netlify, Vercel, Cloudflare Pages) or run `node server.js` on Node.js hosting.

## Quick Start (Local Development)
1. Extract this zip file.
2. Open terminal in the project folder and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

## Production Build & Deployment
### Option A: Node.js / Hostinger VPS / Cloud Run
1. Run:
   ```bash
   npm install
   npm run build
   npm start
   ```
   (Starts Express server on `process.env.PORT` serving `./dist` with SPA history fallback)

### Option B: Static Web Hosting (Hostinger Shared / cPanel / Netlify)
- Simply upload the contents of the included `dist/` directory directly to your `public_html` directory.
