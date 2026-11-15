/**
 * MORTGAGE BROKER - MAIN INTERACTIVE SCRIPT
 * High Performance Vanilla JavaScript (No jQuery / No WP bloat)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initFaqAccordion();
  initLoanFilter();
  initModals();
  initBackToTop();
  initStatCounters();
  initHeroQuickWidget();
  initNewsletterForm();
});

/* Sticky Header on Scroll */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* Off-canvas Mobile Drawer */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.btn-drawer-close');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Submenu toggles in mobile drawer
  const sublinks = document.querySelectorAll('.mobile-menu-link[data-toggle="submenu"]');
  sublinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.closest('.mobile-menu-item');
      const sub = parent.querySelector('.mobile-submenu');
      if (sub) {
        sub.classList.toggle('open');
      }
    });
  });
}

/* FAQ Accordion & Category Filter */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items in the same container
      accordionItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Category Filtering for FAQs
  const catBtns = document.querySelectorAll('.faq-cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');
      accordionItems.forEach(item => {
        const itemCat = item.getAttribute('data-cat');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* Loan Program Filter Tabs */
function initLoanFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.program-card');
  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Animated Stat Counters */
function initStatCounters() {
  const counterEls = document.querySelectorAll('.stat-counter');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNum = parseFloat(target.getAttribute('data-target') || '0');
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        const isDecimal = targetNum % 1 !== 0;
        
        let start = 0;
        const duration = 1600;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = targetNum / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= targetNum) {
            start = targetNum;
            clearInterval(timer);
          }
          target.textContent = `${prefix}${isDecimal ? start.toFixed(1) : Math.floor(start)}${suffix}`;
        }, stepTime);

        obs.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  counterEls.forEach(el => observer.observe(el));
}

/* Hero Quick Estimate Widget */
function initHeroQuickWidget() {
  const homePriceSlider = document.getElementById('heroHomePrice');
  const downPaymentSlider = document.getElementById('heroDownPayment');
  const termButtons = document.querySelectorAll('.hero-term-btn');
  const outputPrice = document.getElementById('heroPriceDisplay');
  const outputDown = document.getElementById('heroDownDisplay');
  const outputMonthly = document.getElementById('heroMonthlyPayment');

  if (!homePriceSlider || !downPaymentSlider || !outputMonthly) return;

  let currentTermYears = 30;
  let interestRate = 6.45; // benchmark rate

  termButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      termButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTermYears = parseInt(btn.getAttribute('data-years'), 10);
      interestRate = currentTermYears === 15 ? 5.85 : (currentTermYears === 20 ? 6.15 : 6.45);
      calculateHeroPayment();
    });
  });

  const calculateHeroPayment = () => {
    const price = parseFloat(homePriceSlider.value);
    const downPercent = parseFloat(downPaymentSlider.value);
    const downAmt = (price * downPercent) / 100;
    const loanAmt = price - downAmt;

    if (outputPrice) outputPrice.textContent = `$${price.toLocaleString()}`;
    if (outputDown) outputDown.textContent = `$${Math.round(downAmt).toLocaleString()} (${downPercent}%)`;

    const monthlyRate = (interestRate / 100) / 12;
    const n = currentTermYears * 12;
    const pAndI = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

    // Approximate taxes & insurance
    const taxes = (price * 0.012) / 12;
    const ins = 110;
    const pmi = downPercent < 20 ? (loanAmt * 0.007) / 12 : 0;
    const totalMonthly = Math.round(pAndI + taxes + ins + pmi);

    outputMonthly.innerHTML = `$${totalMonthly.toLocaleString()} <span>/mo</span>`;
  };

  homePriceSlider.addEventListener('input', calculateHeroPayment);
  downPaymentSlider.addEventListener('input', calculateHeroPayment);
  calculateHeroPayment();
}

/* Modals Management */
function initModals() {
  // Consultation Modal
  const consultTriggers = document.querySelectorAll('[data-modal="consultation"]');
  const consultModal = document.getElementById('consultationModal');

  // Search Modal
  const searchTriggers = document.querySelectorAll('[data-modal="search"]');
  const searchModal = document.getElementById('searchModal');

  // Universal close buttons
  const closeBtns = document.querySelectorAll('.modal-close-btn, [data-close="modal"]');
  const overlays = document.querySelectorAll('.modal-overlay');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  consultTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(consultModal);
    });
  });

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(searchModal);
      const input = searchModal?.querySelector('input');
      if (input) setTimeout(() => input.focus(), 150);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Handle consultation form submission
  const consultForm = document.getElementById('consultationForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(consultModal);
      showToast('Thank you! A senior loan advisor has received your request and will call you within 15 minutes.');
      consultForm.reset();
    });
  }
}

/* Back To Top Scroll */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Newsletter Form */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form-footer');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast('Success! You are now subscribed to our Weekly Mortgage & Interest Rate Forecast.');
      input.value = '';
    }
  });
}

/* Toast Notifications */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7CB933" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// Global expose
window.showToast = showToast;
