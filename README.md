# Mortgage Broker — Premier Home Loans & Real Estate Finance Template

A clean, modern, ultra-responsive HTML5/CSS3/Vanilla JavaScript template crafted for independent mortgage brokers, loan officers, lending institutions, and real estate finance firms. 

Re-architected from the ground up to deliver all the high-end design appeal and functional richness of leading financial themes (such as Ralo), while completely removing WordPress dependencies, bloat, PHP overhead, and plugin footprints.

---

## 🌟 Key Features & Capabilities

- **100% WordPress-Free Architecture:** Pure, semantic HTML5, modern CSS3 (custom CSS variables, flexbox, responsive grids), and vanilla JavaScript. Zero jQuery or framework overhead.
- **14 Production-Ready Pages:**
  1. `index.html` — Homepage Edition 1 (Flagship Mortgage Broker with Hero Quick Estimator, Live Rates Ticker, Loan Programs, Comparison Matrix, Process Steps, Team, Testimonials, Market Insights)
  2. `home-two.html` — Homepage Edition 2 (Fintech & Digital Lending Edition with Instant Wholesale Quote Finder)
  3. `about.html` — About Us (Company Background, Leadership, Mission & Values, Milestones)
  4. `loan-programs.html` — Filterable Directory of all Loan Programs (Purchase, Refinance, FHA, VA, Jumbo, Commercial, Reverse Mortgages)
  5. `loan-details.html` — Program Deep Dive (Eligibility checklist, required documents, terms)
  6. `calculator.html` — Advanced Interactive Mortgage & Full Amortization Suite (Monthly P&I, Property Taxes, Insurance, PMI, dynamic SVG Donut Chart, and exportable/printable annual & monthly amortization schedules)
  7. `apply.html` — 4-Step Interactive Pre-Approval Application Wizard with Instant Pre-Approval Letter Generation
  8. `team.html` — Licensed Loan Officers with NMLS identifiers and strategy consultation booking modal
  9. `faqs.html` — Comprehensive Categorized Knowledge Base with search filtering
  10. `blog.html` — Market Insights & Homebuyer Guides
  11. `blog-details.html` — Article View with typography, author biography, and key takeaways
  12. `contact.html` — Branch office directory, contact details, and interactive lead inquiry form
  13. `privacy-policy.html` — Consumer Financial Privacy Policy (GLBA compliant)
  14. `terms-and-conditions.html` — Equal Housing Opportunity & Lending Disclosures
- **Interactive Financial Calculators:**
  - Dynamic Real-Time Math: $M = P \frac{r(1+r)^n}{(1+r)^n - 1}$
  - Synchronized sliders & numeric text inputs ($ and %)
  - Automatic PMI calculation when down payment < 20%
  - Dynamic visual SVG Donut breakdown (Principal & Interest, Taxes, Insurance, PMI)
  - Full lifetime amortization schedule generator with yearly/monthly toggles and print option
  - One-click transfer of calculated figures into the online pre-approval wizard
- **Interactive Multi-Step Application Wizard:**
  - 4 Progressive Stages: Purpose & Property &rarr; Budget & Credit &rarr; Income & Employment &rarr; Contact & Instant Review
  - Simulated conditional pre-approval certificate generator with printable certificate view
- **Responsive & Accessible Design:**
  - Mobile off-canvas navigation drawer with sub-menu accordion support
  - Sticky elevated header on scroll
  - Live animated benchmark rates marquee ticker
  - Interactive consultation booking modal & search overlay
  - Custom SVG icons and web-optimized retina imagery
  - Regulatory Equal Housing Lender & NMLS compliance badges

---

## 📁 Directory Structure

```
├── css/
│   ├── style.css             # Main styling, design system, variables, components
│   └── responsive.css        # Breakpoints (desktop, tablet, mobile)
├── js/
│   ├── main.js               # Navigation, sticky header, modals, FAQ accordions, filters
│   ├── calculator.js         # Financial math engine, SVG donut chart, amortization generator
│   └── apply-wizard.js       # 4-Step interactive pre-approval wizard & certificate generator
├── images/
│   ├── logo.svg              # Brand logo (Primary forest green & fresh lime)
│   ├── logo-white.svg        # Brand logo (White variant for dark footer)
│   ├── favicon.svg           # Modern favicon
│   ├── equal-housing.svg     # Equal Housing Opportunity badge
│   ├── partner-*.svg         # Accreditation badges (Fannie Mae, Freddie Mac, FHA, VA, BBB, NMLS)
│   ├── icons/                # Clean SVG feature & loan program icons
│   └── *.jpg                 # Curated high-resolution web-optimized photography
├── index.html                # Homepage Edition 1 (Broker Classic)
├── home-two.html             # Homepage Edition 2 (Digital Lending)
├── about.html                # About Us & Company Story
├── loan-programs.html        # All Loan Programs Directory
├── loan-details.html         # 30-Year Fixed Mortgage Deep Dive
├── calculator.html           # Advanced Mortgage & Amortization Suite
├── apply.html                # 4-Step Online Pre-Approval Wizard
├── team.html                 # Licensed Loan Officers Directory
├── faqs.html                 # Knowledge Base & FAQs
├── blog.html                 # Market Insights & News
├── blog-details.html         # Article View
├── contact.html              # Contact & Branch Locations
├── privacy-policy.html       # Privacy Disclosures
├── terms-and-conditions.html # Terms of Service & Disclosures
└── PROJECT_MEMORY.md         # Project tracking and configuration log
```

---

## 🚀 Quick Start / Local Preview

You can open any `.html` file directly in any modern web browser:

```bash
# Option 1: Open directly
start index.html

# Option 2: Run with any local HTTP server
npx.cmd serve .
# or
python -m http.server 8080
```

---

## ⚖️ Compliance & Disclosures

- **Equal Housing Lender:** We adhere to the Fair Housing Act and Equal Credit Opportunity Act.
- **NMLS Unique Identifier:** Displayed across headers and footers for regulatory transparency.
- **GLBA Compliance:** All forms and client disclosures follow consumer financial privacy standards.

---

&copy; 2026 Mortgage Broker LLC. All rights reserved.
