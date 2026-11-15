# Project Memory: Mortgage Broker Template

## 1. Project Overview & Context
- **Project Name:** Mortgage Broker
- **Target Reference:** [Ralo - Real Estate Mortgage & Loans Funding WordPress Theme](https://themes.envytheme.com/ralo/) by EnvyTheme
- **Target Repositories:**
  - [Penta-Websites/Mortgage-Broker](https://github.com/Penta-Websites/Mortgage-Broker)
  - [Pixel-Force/Mortgage-Broker](https://github.com/Pixel-Force/Mortgage-Broker)
- **Live URLs:**
  - **Primary Live Site:** [https://pixel-force.github.io/Mortgage-Broker/](https://pixel-force.github.io/Mortgage-Broker/) (HTTP 200 OK - Active & Verified)
  - **Mirror Site:** [https://penta-websites.github.io/Mortgage-Broker/](https://penta-websites.github.io/Mortgage-Broker/) (Configured on `gh-pages`)

## 2. Core Architecture & Exact Visual Match Implementation
- **Exact Visual Match of Ralo Theme:**
  - Pixel-accurate recreation of the exact visual design, color palette (teal `#006769`, orange `#ea6227`, gold `#fdb813`, navy `#071952`), Figtree & Outfit Google Fonts typography, card layouts, and responsive breakpoints.
  - Sourced and localized all original Ralo graphic assets: authentic hero banner photos (`banner-1.jpg`–`banner-4.jpg`), corporate partner logos (`partner-1.png`–`partner-8.png`), loan service images (`buying-1.jpg`–`buying-7.jpg`), loan officer portraits (`team-1.jpg`–`team-6.jpg`), client testimonial avatars (`testimonial-1.jpg`–`testimonial-10.jpg`), and article thumbnails (`blog-1.jpg`–`blog-8.jpg`).
  - Sourced authentic Flaticon iconography (`fonts/flaticon_mycollection.*` and `css/flaticon.css`) and Remix Icons (`css/remixicon.css`).
- **Zero WordPress Footprint:**
  - 100% clean, standalone HTML5/CSS3/JavaScript codebase.
  - Completely stripped all WordPress core scripts, Elementor widgets, plugins bloat, PHP templates, generator meta tags, and `wp-content` URL structures.
  - Cloudflare email obfuscation (`__cf_email__`) deciphered into human-readable clear text.
- **12 Production-Ready HTML5 Pages Built:**
  1. `index.html` — Authentic Ralo Homepage: Topbar, sticky header navbar with search trigger, 4-slide hero banner with loan rate highlight cards, client partner carousel, top-rated mortgage loan services, interactive mortgage calculator with live result panel, 6-card loan financing options, 3-step application roadmap with stat counters, loan officer roster, testimonial carousel with verified ratings, latest blog insights, and full footer.
  2. `home-two.html` — Authentic Ralo Home Two Layout.
  3. `about.html` — Company overview, mission, leadership, core values, and stats counters.
  4. `loan-programs.html` — Comprehensive directory of mortgage loan solutions.
  5. `loan-details.html` — Detailed loan terms, eligibility criteria, and required documents.
  6. `calculator.html` — Interactive financial mortgage calculator with real-time calculations.
  7. `apply.html` — Multi-step online mortgage application wizard.
  8. `team.html` — Loan officers and mortgage broker specialists directory.
  9. `faqs.html` — Frequently asked questions accordion.
  10. `blog.html` — Mortgage industry news and home financing articles.
  11. `blog-details.html` — Full article reading template with author bio and comments.
  12. `contact.html` — Office locations, contact information, and lead inquiry form.
  13. `privacy-policy.html` — Privacy policy and consumer data disclosure.
  14. `terms-and-conditions.html` — Terms of service and lending disclosure.

## 3. Interactive Functionalities
- **Sliders & Carousels:** Initialized via Owl Carousel (`.owl-banner-slide`, `.owl-partner-slide`, `.owl-testimonials-slide`) with responsive breakpoints, autoplay, and navigation arrows.
- **Client-Side Real-Time Mortgage Calculator:** Computes monthly principal and interest using standard mortgage amortization formula $$M = P \frac{r(1+r)^n}{(1+r)^n - 1}$$ and displays live total monthly payment, total interest, and total cost breakdown.
- **Search Popup Overlay:** Search modal with close button.
- **Stat Counters & Odometer:** Animated numerical counting for loans funded, happy clients, and approval rates.
- **Back to Top Button:** Smooth scroll-to-top trigger.
- **Mobile Responsive Drawer Menu:** Off-canvas responsive navigation for mobile and tablet viewports.

## 4. Deployment Status & Git History
- **Repository Remotes:**
  - `origin`: `https://github.com/Penta-Websites/Mortgage-Broker.git`
  - `pixel`: `https://github.com/Pixel-Force/Mortgage-Broker.git`
- **Branches Synchronized:** Both `main` and `gh-pages` updated to latest commit on both remotes.
- **Primary Live URL:** [https://pixel-force.github.io/Mortgage-Broker/](https://pixel-force.github.io/Mortgage-Broker/) (HTTP 200 OK)
