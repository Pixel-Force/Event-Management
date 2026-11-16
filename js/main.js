/**
 * EVENT MANAGEMENT — MAIN INTERACTION SCRIPT
 * Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. STICKY HEADER
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top click
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. HERO SLIDER LOGIC
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.slider-prev-btn');
  const nextBtn = document.querySelector('.slider-next-btn');
  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.remove('active');
      if (i === index) s.classList.add('active');
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 1) {
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetSlideInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetSlideInterval(); });

    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 7000);
    }

    function resetSlideInterval() {
      clearInterval(slideInterval);
      startSlideInterval();
    }

    startSlideInterval();
  }

  // 3. MOBILE DRAWER NAVIGATION
  const mobileToggleBtn = document.querySelector('.mobile-toggle-btn');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileDrawerOverlay = document.querySelector('.mobile-drawer-overlay');

  function openDrawer() {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.add('active');
      mobileDrawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.remove('active');
      mobileDrawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeDrawer);

  // Mobile submenu accordion
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdowns.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.mobile-nav-item');
      const submenu = parent.querySelector('.mobile-submenu');
      if (submenu) {
        submenu.classList.toggle('open');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-angle-up');
          icon.classList.toggle('fa-angle-down');
        }
      }
    });
  });

  // 4. CATEGORY FILTERING (EVENTS & GALLERY)
  const filterBtns = document.querySelectorAll('.filter-btn, .gallery-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('section');
      const group = container.querySelectorAll('.filter-btn, .gallery-tab-btn');
      group.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const items = container.querySelectorAll('.filterable-item, .gallery-box-item');

      items.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. LIVE EVENT COUNTDOWN TIMER
    const countdownEls = document.querySelectorAll('.event-countdown, #countdown-timer, .countdown-timer');
  if (countdownEls.length > 0) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 24);
    targetDate.setHours(18, 0, 0, 0);

    function updateCountdown() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) return;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      countdownEls.forEach(countdownEl => {
        const dEl = countdownEl.querySelector('.count-days');
        const hEl = countdownEl.querySelector('.count-hours');
        const mEl = countdownEl.querySelector('.count-minutes');
        const sEl = countdownEl.querySelector('.count-seconds');

        if (dEl) dEl.textContent = String(days).padStart(2, '0');
        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
        if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
      });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 6. MODAL SYSTEM (Tickets, Quotes, Search, Lightbox)
  const openModalBtns = document.querySelectorAll('[data-modal-target]');
  const closeModalBtns = document.querySelectorAll('[data-modal-close]');
  const modals = document.querySelectorAll('.custom-modal-overlay');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        const eventTitle = btn.getAttribute('data-event-title');
        const eventPrice = btn.getAttribute('data-event-price');
        if (eventTitle && targetModal.querySelector('.modal-event-title')) {
          targetModal.querySelector('.modal-event-title').textContent = eventTitle;
        }
        if (eventPrice && targetModal.querySelector('.ticket-unit-price')) {
          targetModal.querySelector('.ticket-unit-price').textContent = eventPrice;
          updateTicketTotal(targetModal);
        }
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.custom-modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  function updateTicketTotal(modal) {
    const qtyInput = modal.querySelector('.ticket-qty-input');
    const unitPriceEl = modal.querySelector('.ticket-unit-price');
    const totalEl = modal.querySelector('.ticket-total-price');

    if (qtyInput && totalEl) {
      const qty = parseInt(qtyInput.value) || 1;
      let unit = 50;
      if (unitPriceEl) {
        unit = parseFloat(unitPriceEl.textContent.replace(/[^0-9.]/g, '')) || 50;
      }
      const total = qty * unit;
      totalEl.textContent = '$' + total.toFixed(2);
    }
  }

  document.querySelectorAll('.ticket-qty-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const modal = e.target.closest('.custom-modal-overlay');
      if (modal) updateTicketTotal(modal);
    });
  });

  // 7. GALLERY LIGHTBOX
  const galleryItems = document.querySelectorAll('.gallery-zoom-trigger');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const imgUrl = item.getAttribute('data-img-src') || item.closest('.gallery-box-item, .gallery-item').querySelector('img').src;
      if (lightboxModal && lightboxImg) {
        lightboxImg.src = imgUrl;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 8. FAQ ACCORDIONS
  const faqHeaders = document.querySelectorAll('.faq-accordion-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-accordion-item');
      const body = item.querySelector('.faq-accordion-body');
      const isActive = item.classList.contains('active');

      const group = item.closest('.faq-accordion-group');
      if (group) {
        group.querySelectorAll('.faq-accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
          const sibBody = sibling.querySelector('.faq-accordion-body');
          if (sibBody) sibBody.style.maxHeight = null;
        });
      }

      if (!isActive) {
        item.classList.add('active');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        if (body) body.style.maxHeight = null;
      }
    });
  });

  // 9. FORM SUBMISSIONS
  const inquiryForms = document.querySelectorAll('form.ajax-form');
  inquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      }

      setTimeout(() => {
        showToast('Success! Your inquiry has been received. Our event coordinator will contact you shortly.', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        const modal = form.closest('.custom-modal-overlay');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 800);
    });
  });

  function showToast(message, type = 'success') {
    let toast = document.querySelector('.custom-toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'custom-toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(50px)';
    toast.style.backgroundColor = type === 'success' ? '#0e385e' : '#ff3d55';
    toast.style.color = '#ffffff';
    toast.style.padding = '14px 28px';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
    toast.style.zIndex = '99999';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.95rem';
    toast.style.borderLeft = '4px solid #ff3d55';
    toast.style.transition = 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)';
    toast.style.opacity = '0';

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(50px)';
    }, 4000);
  }
});
