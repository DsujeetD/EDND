# PRD — EDND Services (Staffing Studio Website)

## Original Problem Statement
"Build this website exactly with your own ideas, full stack" — based on a screen-recording video + screenshots. User confirmed:
- Design: **EDND Services editorial style** (cream #efeae0 bg, Playfair Display serif headlines, orange #f14a16 accents, Space Mono labels) **plus** the video's multi-step "Get a staff estimate in 30 seconds" wizard.
- Brand: EDND Services (Mumbai, Est. 2018), contact details from video: +91 89290 13355 / info@worldconnect.co.in.
- Backend: staff request wizard + contact enquiries saved to MongoDB, simple admin view (no auth).

## Architecture
- Frontend: React (CRA) + Tailwind, routes: `/` (Home), `/request-staff` (wizard), `/admin`.
- Backend: FastAPI `/app/backend/server.py`, MongoDB (motor). Collections: `staff_requests`, `contact_enquiries` (uuid ids, ISO created_at).
- API: `POST/GET /api/staff-requests`, `POST/GET /api/contact`.

## Key Files
- `/app/frontend/src/data.js` — all content (roster, services, cities, presence, process, clients, stats, contact info)
- `/app/frontend/src/components/site/` — Header, Ticker, Hero, FeaturedGrid, Stats, Marquee, DeployList, Presence, Process (+ClientsMarquee), Contact (CTABlock + ContactSection), Footer (+HireMarquee)
- `/app/frontend/src/pages/` — Home.jsx, RequestStaff.jsx (5-step wizard), Admin.jsx

## Implemented (Jun 2026)
- [x] Full home page: hero, live IST ticker, featured carousel + 6 roster cards, stats, black marquee, "What we deploy" 8-service list (hover-black rows), "On the ground, everywhere" 8-city presence grid, "Three moves. One team." process, clients marquee, CTA block, contact form, black footer with giant EDND wordmark + "Available Now for hire" marquee
- [x] 5-step wizard (Service → City → Quantity → Date → Submit) with live summary sidebar, deep-link `?service=` pre-select, success screen
- [x] Contact form → MongoDB with sonner toasts
- [x] Admin view `/admin` — tabs for staff requests & enquiries
- [x] Testing: iteration_1.json — 100% backend, 100% frontend pass

## Backlog
- P2: Real social links in footer; email notification on new request (Resend/SendGrid)
- P2: Admin auth if admin view should be private
- P3: Lifespan handler instead of deprecated @app.on_event; server-side date validation
