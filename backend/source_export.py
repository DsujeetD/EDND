import io
import zipfile
from pathlib import Path

FRONTEND = Path("/app/frontend")
BACKEND = Path("/app/backend")

CLEAN_INDEX_HTML = """<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#141311" />
        <meta name="description" content="EDND Services - Staffing studio for events, exhibitions, surveys and brand activations." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,500;1,600;1,700;1,800&family=Space+Mono:wght@400;700&family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>EDND Services — Humanpower, engineered for the stage.</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
    </body>
</html>
"""

CLEAN_CRACO = """const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
"""

FRONTEND_ENV = "REACT_APP_BACKEND_URL=http://localhost:8001\n"
BACKEND_ENV = 'MONGO_URL="mongodb://localhost:27017"\nDB_NAME="ednd_services"\nCORS_ORIGINS="*"\n'

README = """# EDND Services — Staffing Studio Website

Full-stack website: React frontend + FastAPI backend + MongoDB.
Runs fully standalone — no external platform required.

## Prerequisites
- Node.js 18+ and Yarn (`npm install -g yarn`)
- Python 3.10+
- MongoDB running locally (default: mongodb://localhost:27017)

## 1. Start the backend
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```
API available at http://localhost:8001/api/

## 2. Start the frontend
```bash
cd frontend
yarn install
yarn start
```
Site opens at http://localhost:3000

## Configuration
- `frontend/.env` → `REACT_APP_BACKEND_URL` (points to the backend, default http://localhost:8001)
- `backend/.env` → `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`

## Pages
- `/` — Home (hero, services, presence, process, contact form)
- `/request-staff` — 5-step "staff estimate in 30 seconds" wizard
- `/admin` — View submitted staff requests & contact enquiries

## API
- `POST/GET /api/staff-requests`
- `POST/GET /api/contact`
"""

GITIGNORE = "node_modules/\nbuild/\n__pycache__/\n*.pyc\n.DS_Store\n"

FRONTEND_ROOT_FILES = [
    "package.json",
    "yarn.lock",
    "tailwind.config.js",
    "postcss.config.js",
    "jsconfig.json",
    "components.json",
]

EXCLUDE_SRC = {"constants"}


def build_source_zip() -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("ednd-services/README.md", README)
        z.writestr("ednd-services/.gitignore", GITIGNORE)

        z.writestr("ednd-services/backend/server.py", (BACKEND / "server.py").read_text())
        z.writestr("ednd-services/backend/source_export.py", (BACKEND / "source_export.py").read_text())
        z.writestr("ednd-services/backend/requirements.txt", (BACKEND / "requirements.txt").read_text())
        z.writestr("ednd-services/backend/.env", BACKEND_ENV)
        z.writestr("ednd-services/backend/.env.example", BACKEND_ENV)

        for name in FRONTEND_ROOT_FILES:
            p = FRONTEND / name
            if p.exists():
                z.writestr(f"ednd-services/frontend/{name}", p.read_text())
        z.writestr("ednd-services/frontend/craco.config.js", CLEAN_CRACO)
        z.writestr("ednd-services/frontend/.env", FRONTEND_ENV)
        z.writestr("ednd-services/frontend/.env.example", FRONTEND_ENV)
        z.writestr("ednd-services/frontend/public/index.html", CLEAN_INDEX_HTML)

        src = FRONTEND / "src"
        for p in src.rglob("*"):
            if p.is_dir():
                continue
            rel = p.relative_to(src)
            if rel.parts and rel.parts[0] in EXCLUDE_SRC:
                continue
            z.writestr(f"ednd-services/frontend/src/{rel.as_posix()}", p.read_bytes())

    return buf.getvalue()
