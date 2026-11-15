/**
 * MORTGAGE BROKER - MULTI-STEP LOAN APPLICATION & PRE-APPROVAL WIZARD
 * Interactive Step Progression, Dynamic Loan Eligibility Estimation & Instant Pre-Approval Letter
 */

document.addEventListener('DOMContentLoaded', () => {
  const wizard = document.getElementById('mortgageWizard');
  if (!wizard) return;

  let currentStep = 1;
  const totalSteps = 4;

  const stepPanes = document.querySelectorAll('.wizard-step-pane');
  const stepNodes = document.querySelectorAll('.wizard-step-node');
  const btnPrev = document.getElementById('wizardPrevBtn');
  const btnNext = document.getElementById('wizardNextBtn');
  const btnSubmit = document.getElementById('wizardSubmitBtn');

  // Choice Cards Selection
  const choiceCards = document.querySelectorAll('.choice-card');
  choiceCards.forEach(card => {
    card.addEventListener('click', () => {
      const group = card.getAttribute('data-group');
      if (group) {
        document.querySelectorAll(`.choice-card[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      }
      card.classList.add('selected');
    });
  });

  // Pre-fill from calculator if stored
  const savedPrice = sessionStorage.getItem('prequal_price');
  const savedDown = sessionStorage.getItem('prequal_down');
  if (savedPrice && document.getElementById('wizPrice')) {
    document.getElementById('wizPrice').value = savedPrice;
  }
  if (savedDown && document.getElementById('wizDown')) {
    document.getElementById('wizDown').value = savedDown;
  }

  const updateWizardUI = () => {
    // Step Panes
    stepPanes.forEach(pane => {
      const stepIndex = parseInt(pane.getAttribute('data-step'), 10);
      if (stepIndex === currentStep) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Step Nodes
    stepNodes.forEach(node => {
      const stepIndex = parseInt(node.getAttribute('data-step'), 10);
      node.classList.remove('active', 'completed');
      if (stepIndex === currentStep) {
        node.classList.add('active');
      } else if (stepIndex < currentStep) {
        node.classList.add('completed');
      }
    });

    // Navigation Buttons
    if (btnPrev) {
      btnPrev.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    }

    if (currentStep === totalSteps) {
      if (btnNext) btnNext.style.display = 'none';
      if (btnSubmit) btnSubmit.style.display = 'inline-flex';
      calculateEligibilityRecap();
    } else {
      if (btnNext) btnNext.style.display = 'inline-flex';
      if (btnSubmit) btnSubmit.style.display = 'none';
    }

    // Scroll to wizard top
    wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validateStep = (step) => {
    const activePane = document.querySelector(`.wizard-step-pane[data-step="${step}"]`);
    if (!activePane) return true;

    const requiredInputs = activePane.querySelectorAll('input[required], select[required]');
    for (let input of requiredInputs) {
      if (!input.value.trim()) {
        input.focus();
        if (window.showToast) {
          window.showToast(`Please complete the required field: ${input.getAttribute('placeholder') || 'Information'}`);
        }
        return false;
      }
    }
    return true;
  };

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          currentStep++;
          updateWizardUI();
        }
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }

  const calculateEligibilityRecap = () => {
    const price = parseFloat(document.getElementById('wizPrice')?.value || '450000');
    const down = parseFloat(document.getElementById('wizDown')?.value || '90000');
    const loanAmt = Math.max(0, price - down);
    const income = parseFloat(document.getElementById('wizIncome')?.value || '110000');

    // Approximate DTI and monthly payment
    const monthlyRate = (6.45 / 100) / 12;
    const n = 360;
    const pi = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const estMonthly = Math.round(pi + (price * 0.012) / 12 + 115);

    const recapLoanAmt = document.getElementById('recapLoanAmt');
    const recapMonthly = document.getElementById('recapMonthly');
    const recapMaxHome = document.getElementById('recapMaxHome');

    if (recapLoanAmt) recapLoanAmt.textContent = `$${Math.round(loanAmt).toLocaleString()}`;
    if (recapMonthly) recapMonthly.textContent = `$${estMonthly.toLocaleString()} /mo`;
    if (recapMaxHome) {
      const maxPurchase = Math.round((income * 4.5));
      recapMaxHome.textContent = `$${maxPurchase.toLocaleString()}`;
    }
  };

  // Form Submission & Pre-Approval Letter Generation
  const applicationForm = document.getElementById('mortgageApplicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateStep(currentStep)) return;

      const firstName = document.getElementById('wizFirstName')?.value || 'Homebuyer';
      const lastName = document.getElementById('wizLastName')?.value || '';
      const email = document.getElementById('wizEmail')?.value || '';
      const price = document.getElementById('wizPrice')?.value || '450,000';
      const down = document.getElementById('wizDown')?.value || '90,000';

      const certContainer = document.getElementById('preApprovalCertificate');
      if (certContainer) {
        certContainer.innerHTML = `
          <div style="background: #F7FAF5; border: 2px dashed #2B5A3E; border-radius: 16px; padding: 36px; text-align: center; margin-top: 24px;">
            <div style="display:inline-flex; align-items:center; gap:8px; background: #E9F4DE; color: #1B382B; padding: 6px 16px; border-radius: 99px; font-weight: 700; font-size: 0.88rem; margin-bottom: 16px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6BA32C" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              OFFICIAL CONDITIONAL PRE-APPROVAL CERTIFICATE
            </div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.8rem; margin-bottom: 8px;">Congratulations, ${firstName} ${lastName}!</h2>
            <p style="color: #4E5D55; font-size: 1.05rem; max-width: 580px; margin: 0 auto 24px auto;">
              Based on your verified financial profile, you are conditionally pre-approved for a home loan up to <strong>$${(parseFloat(price.replace(/,/g,'')) - parseFloat(down.replace(/,/g,''))).toLocaleString()}</strong>.
            </p>
            <div style="background: #FFFFFF; border: 1px solid #E2ECE0; border-radius: 12px; padding: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; text-align: left;">
              <div>
                <span style="font-size:0.78rem; text-transform:uppercase; color:#74837B; display:block;">Target Property</span>
                <strong style="font-family:'Outfit'; font-size:1.1rem; color:#141A17;">$${parseFloat(price.replace(/,/g,'')).toLocaleString()}</strong>
              </div>
              <div>
                <span style="font-size:0.78rem; text-transform:uppercase; color:#74837B; display:block;">Estimated Down Payment</span>
                <strong style="font-family:'Outfit'; font-size:1.1rem; color:#141A17;">$${parseFloat(down.replace(/,/g,'')).toLocaleString()}</strong>
              </div>
              <div>
                <span style="font-size:0.78rem; text-transform:uppercase; color:#74837B; display:block;">NMLS Pre-Approval ID</span>
                <strong style="font-family:'Outfit'; font-size:1.1rem; color:#2B5A3E;">MB-2026-${Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
            </div>
            <p style="font-size: 0.88rem; color: #74837B; margin-bottom: 20px;">
              A formal PDF copy of your pre-approval letter and mortgage options breakdown has been transmitted to <strong>${email}</strong>.
            </p>
            <div style="display:flex; justify-content:center; gap:14px; flex-wrap:wrap;">
              <button type="button" class="btn btn-dark" onclick="window.print()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Print Pre-Approval Letter
              </button>
              <a href="calculator.html" class="btn btn-outline">Explore Loan Calculators</a>
            </div>
          </div>
        `;

        // Hide form inputs
        document.querySelector('.wizard-steps-indicator').style.display = 'none';
        stepPanes.forEach(p => p.style.display = 'none');
        document.querySelector('.wizard-nav-btns').style.display = 'none';
      }
    });
  }

  updateWizardUI();
});
