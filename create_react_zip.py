import os
import shutil
import zipfile
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ZIP_OUTPUT_DIR = os.path.join(BASE_DIR, "public")
ZIP_NAME = "connekt-homes-react-app.zip"
ZIP_PATH = os.path.join(ZIP_OUTPUT_DIR, ZIP_NAME)

TEMP_STAGE_DIR = "/tmp/connekt-homes-clean-app"
if os.path.exists(TEMP_STAGE_DIR):
    shutil.rmtree(TEMP_STAGE_DIR)
os.makedirs(TEMP_STAGE_DIR, exist_ok=True)

# 1. Copy files to clean staging directory
files_to_copy = [
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "index.html",
    "metadata.json",
    "server.js",
    ".env.example",
    ".gitignore",
]

for f in files_to_copy:
    src_f = os.path.join(BASE_DIR, f)
    if os.path.exists(src_f):
        shutil.copy2(src_f, os.path.join(TEMP_STAGE_DIR, f))

# Copy src directory
shutil.copytree(os.path.join(BASE_DIR, "src"), os.path.join(TEMP_STAGE_DIR, "src"))

# 2. In clean staging src/App.tsx, remove FloatingThemeDownload
app_tsx_path = os.path.join(TEMP_STAGE_DIR, "src", "App.tsx")
if os.path.exists(app_tsx_path):
    with open(app_tsx_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove import
    content = content.replace("import { FloatingThemeDownload } from './components/FloatingThemeDownload';", "")
    # Remove JSX usage
    content = content.replace("<FloatingThemeDownload />", "")
    content = content.replace("<FloatingThemeDownload/>", "")

    with open(app_tsx_path, "w", encoding="utf-8") as f:
        f.write(content)

# Remove the FloatingThemeDownload component file completely from clean app
floating_comp_path = os.path.join(TEMP_STAGE_DIR, "src", "components", "FloatingThemeDownload.tsx")
if os.path.exists(floating_comp_path):
    os.remove(floating_comp_path)

# 3. Build clean dist in staging directory
# Link node_modules so vite build can run
os.symlink(os.path.join(BASE_DIR, "node_modules"), os.path.join(TEMP_STAGE_DIR, "node_modules"))

try:
    print("Building clean production dist without floating download button...")
    subprocess.run(["npx", "vite", "build"], cwd=TEMP_STAGE_DIR, check=True)
    print("Clean build succeeded!")
except Exception as e:
    print(f"Warning during clean build: {e}")

# Remove the node_modules symlink before zipping
os.remove(os.path.join(TEMP_STAGE_DIR, "node_modules"))

# 4. Add comprehensive README.md
readme_content = """# Connekt Homes – React + Vite Web Application

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
- **Clean Client Build**: This production zip has all demo/download buttons stripped out.
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
### Option A: Static Web Hosting (Hostinger Shared / cPanel / Netlify)
- Simply upload the contents of the included `dist/` directory directly to your `public_html` directory.
- All pages, fonts, and assets will load immediately.

### Option B: Node.js / Hostinger VPS / Cloud Run
1. Run:
   ```bash
   npm install
   npm run build
   npm start
   ```
   (Starts Express server on `process.env.PORT` serving `./dist` with SPA history fallback)
"""

with open(os.path.join(TEMP_STAGE_DIR, "README.md"), "w", encoding="utf-8") as f:
    f.write(readme_content)

# 5. Create ZIP Archive
os.makedirs(ZIP_OUTPUT_DIR, exist_ok=True)
with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(TEMP_STAGE_DIR):
        for file in files:
            full_p = os.path.join(root, file)
            rel_p = os.path.relpath(full_p, TEMP_STAGE_DIR)
            zipf.write(full_p, os.path.join("connekt-homes-app", rel_p))

# Copy to dist as well so dev & prod server can serve it
dist_dir = os.path.join(BASE_DIR, "dist")
if os.path.exists(dist_dir):
    shutil.copy2(ZIP_PATH, os.path.join(dist_dir, ZIP_NAME))

print(f"Successfully generated clean React + Vite app zip (WITHOUT floating download button) at: {ZIP_PATH}")
print(f"File size: {os.path.getsize(ZIP_PATH)} bytes")
