# EDND — Corporate Website

A premium, modern, fully responsive corporate website for **EDND (Events, Manpower & Experiences)**.

**Brand Tagline**: `LEARN • EARN • GROW`  
**Brand Positioning**: Corporate Event Management, Brand Experiences, Exhibitions and Integrated Event Solutions.

---

## 🌟 Key Features

1. **Brand-Aligned Corporate Aesthetic**:
   - Palette: Deep Navy Blue (`#040812`, `#070e1e`, `#101d36`), Crisp White (`#ffffff`), Vibrant Cyan (`#00d2ff`), and Fresh Green (`#00e676`).
   - Official EDND logo preserved with its original geometry, typography, and accent colors.
   - Clean glassmorphism header, smooth scroll transitions, and accessible typography powered by *Plus Jakarta Sans*.

2. **Dedicated Pages**:
   - `index.html`: Corporate Homepage with cinematic hero, overview, core capabilities, industries served, value propositions, and direct contact CTA.
   - `about.html`: In-depth company profile, operational pillars, and the philosophy behind *LEARN • EARN • GROW*.
   - `services.html`: Complete service portfolio across 5 primary categories (Corporate Event Management, Brand Experiences & Activations, Trade Fairs & Exhibitions, Event Production & Execution, and Other Specialized Services).
   - `industries.html`: Tailored sector solutions for Corporate & Enterprise, Education & Universities, Marketing & Advertising, Exhibitions & Trade Shows, Consumer Brands, and Sports & Entertainment.
   - `work.html`: Interactive portfolio gallery with category filters (Conferences, Exhibitions, Activations, Launches, Gatherings, Production) and transparent illustrative notices.
   - `contact.html`: Direct communication hub featuring **only the two official contact options** (Email & WhatsApp) with one-click copy buttons and pre-filled subject/message templates.

3. **Strict Compliance with Rules**:
   - **Only Two Contact Options**:
     - **Email**: `ednd.org@gmail.com` (Pre-filled subject: `Business Enquiry – EDND`)
     - **WhatsApp**: `+91 9967750370` (Pre-filled message: `Hello EDND Team, I am interested in your event management and brand experience services. I would like to discuss a business requirement.`)
   - **No forms or database overhead**: Zero contact enquiry forms, zero database dependencies, and zero paid API dependencies.
   - **Authenticity Guarantee**: No fabricated statistics, invented testimonials, or unverified awards.

---

## 📂 Project Structure

```
ednd-corporate-website/
├── index.html              # Homepage
├── about.html              # About Us
├── services.html           # Complete Service Portfolio
├── industries.html         # Industries We Serve
├── work.html               # Our Work / Portfolio Gallery
├── contact.html            # Contact Us (Email & WhatsApp only)
├── css/
│   └── style.css           # Custom Corporate Design System
├── js/
│   └── main.js             # Mobile nav, portfolio filters, header scroll
├── assets/
│   └── images/             # EDND Logo variants, favicon, and high-res photography
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Search engine directives
├── _headers                # Cloudflare Pages security & caching headers
└── README.md               # Documentation & Deployment Guide
```

---

## 🚀 Deployment to Cloudflare Pages (Free Hosting)

This website is built with clean HTML5, CSS3, and vanilla JavaScript. It requires **zero build commands** and deploys instantly to Cloudflare Pages with a free `*.pages.dev` subdomain and supports custom domain mapping anytime.

### Method 1: Cloudflare Pages Direct Upload (Drag & Drop)
1. Log in to your free [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, click **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
3. Name your project (e.g., `ednd` or `ednd-events`).
4. Drag and drop the `ednd-corporate-website` directory or upload the folder contents.
5. Click **Deploy Site**. Your site will immediately go live at `https://ednd.pages.dev` (or your chosen project name).

### Method 2: Git Integration (GitHub / GitLab)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of EDND Corporate Website"
   git branch -M main
   git remote add origin https://github.com/your-username/ednd-website.git
   git push -u origin main
   ```
2. In Cloudflare Pages, select **Connect to Git** and choose the repository.
3. Set **Framework preset**: `None`.
4. Set **Build command**: Leave blank.
5. Set **Build output directory**: `/` (root) or leave as default.
6. Click **Save and Deploy**. Cloudflare will automatically rebuild and deploy on every git commit!

### Connecting a Custom Domain (Later)
- In the Cloudflare Pages project settings, go to the **Custom domains** tab.
- Click **Set up a custom domain** and enter your domain (e.g. `ednd.org` or `www.ednd.org`).
- Cloudflare will provision a free SSL certificate automatically.

---

## 💻 Local Preview
To preview the website locally on your computer:
1. Open terminal in this folder and start a simple web server:
   ```bash
   python -m http.server 8080
   ```
2. Open your browser and navigate to `http://localhost:8080`.
