/**
 * MORTGAGE BROKER - COMPREHENSIVE MORTGAGE & AMORTIZATION ENGINE
 * Precision Financial Formulas, Dynamic Visual Donut Chart & Full Amortization Schedule
 */

class MortgageCalculator {
  constructor() {
    this.priceInput = document.getElementById('calcHomePrice');
    this.priceSlider = document.getElementById('calcPriceSlider');
    this.downAmtInput = document.getElementById('calcDownAmt');
    this.downPctInput = document.getElementById('calcDownPct');
    this.downSlider = document.getElementById('calcDownSlider');
    this.rateInput = document.getElementById('calcRate');
    this.rateSlider = document.getElementById('calcRateSlider');
    this.taxInput = document.getElementById('calcTaxAnnual');
    this.insuranceInput = document.getElementById('calcInsAnnual');
    this.hoaInput = document.getElementById('calcHoaMonthly');

    this.termButtons = document.querySelectorAll('.calc-term-btn');
    this.termYears = 30;

    // Display Elements
    this.totalMonthlyEl = document.getElementById('totalMonthlyPayment');
    this.piMonthlyEl = document.getElementById('piMonthly');
    this.taxMonthlyEl = document.getElementById('taxMonthly');
    this.insMonthlyEl = document.getElementById('insMonthly');
    this.pmiMonthlyEl = document.getElementById('pmiMonthly');
    this.hoaMonthlyEl = document.getElementById('hoaMonthly');

    this.totalLoanAmtEl = document.getElementById('statTotalLoanAmt');
    this.totalInterestEl = document.getElementById('statTotalInterest');
    this.totalCostEl = document.getElementById('statTotalCost');
    this.payoffDateEl = document.getElementById('statPayoffDate');

    // Chart Segments
    this.chartSegPI = document.getElementById('segPI');
    this.chartSegTax = document.getElementById('segTax');
    this.chartSegIns = document.getElementById('segIns');
    this.chartSegPMI = document.getElementById('segPMI');

    // Amortization Table
    this.amortTableBody = document.getElementById('amortTableBody');
    this.amortToggleAnnual = document.getElementById('amortToggleAnnual');
    this.amortToggleMonthly = document.getElementById('amortToggleMonthly');
    this.amortMode = 'annual'; // 'annual' or 'monthly'

    this.init();
  }

  init() {
    if (!this.priceInput) return;

    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    // Price sync
    this.priceSlider?.addEventListener('input', (e) => {
      this.priceInput.value = e.target.value;
      this.syncDownPaymentFromPercent();
      this.calculate();
    });

    this.priceInput?.addEventListener('input', (e) => {
      if (this.priceSlider) this.priceSlider.value = e.target.value;
      this.syncDownPaymentFromPercent();
      this.calculate();
    });

    // Down Payment percent slider
    this.downSlider?.addEventListener('input', (e) => {
      if (this.downPctInput) this.downPctInput.value = e.target.value;
      this.syncDownPaymentFromPercent();
      this.calculate();
    });

    this.downPctInput?.addEventListener('input', (e) => {
      if (this.downSlider) this.downSlider.value = e.target.value;
      this.syncDownPaymentFromPercent();
      this.calculate();
    });

    this.downAmtInput?.addEventListener('input', (e) => {
      const price = parseFloat(this.priceInput.value) || 0;
      const amt = parseFloat(this.downAmtInput.value) || 0;
      if (price > 0) {
        const pct = Math.min(100, Math.max(0, (amt / price) * 100));
        if (this.downPctInput) this.downPctInput.value = pct.toFixed(1);
        if (this.downSlider) this.downSlider.value = pct.toFixed(1);
      }
      this.calculate();
    });

    // Rate sync
    this.rateSlider?.addEventListener('input', (e) => {
      this.rateInput.value = e.target.value;
      this.calculate();
    });

    this.rateInput?.addEventListener('input', (e) => {
      if (this.rateSlider) this.rateSlider.value = e.target.value;
      this.calculate();
    });

    // Additional fields
    this.taxInput?.addEventListener('input', () => this.calculate());
    this.insuranceInput?.addEventListener('input', () => this.calculate());
    this.hoaInput?.addEventListener('input', () => this.calculate());

    // Term buttons
    this.termButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.termButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.termYears = parseInt(btn.getAttribute('data-years'), 10) || 30;
        this.calculate();
      });
    });

    // Amortization toggles
    this.amortToggleAnnual?.addEventListener('click', () => {
      this.amortToggleAnnual.classList.add('active');
      this.amortToggleMonthly.classList.remove('active');
      this.amortMode = 'annual';
      this.renderAmortization();
    });

    this.amortToggleMonthly?.addEventListener('click', () => {
      this.amortToggleMonthly.classList.add('active');
      this.amortToggleAnnual.classList.remove('active');
      this.amortMode = 'monthly';
      this.renderAmortization();
    });

    // Pre-qualify button
    const prequalBtn = document.getElementById('btnPreQualWithTerms');
    prequalBtn?.addEventListener('click', () => {
      const price = this.priceInput.value;
      const down = this.downAmtInput.value;
      const rate = this.rateInput.value;
      const term = this.termYears;
      
      // Store in sessionStorage or trigger wizard
      sessionStorage.setItem('prequal_price', price);
      sessionStorage.setItem('prequal_down', down);
      sessionStorage.setItem('prequal_rate', rate);
      sessionStorage.setItem('prequal_term', term);

      window.location.href = 'apply.html';
    });
  }

  syncDownPaymentFromPercent() {
    const price = parseFloat(this.priceInput.value) || 0;
    const pct = parseFloat(this.downPctInput.value) || 0;
    const downAmt = Math.round((price * pct) / 100);
    if (this.downAmtInput) this.downAmtInput.value = downAmt;
  }

  calculate() {
    const homePrice = parseFloat(this.priceInput.value) || 0;
    const downPayment = parseFloat(this.downAmtInput.value) || 0;
    const loanAmount = Math.max(0, homePrice - downPayment);
    const annualRate = parseFloat(this.rateInput.value) || 0;
    const annualTax = parseFloat(this.taxInput?.value || (homePrice * 0.012));
    const annualInsurance = parseFloat(this.insuranceInput?.value || 1200);
    const monthlyHoa = parseFloat(this.hoaInput?.value || 0);

    // Monthly interest calculation
    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = this.termYears * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0 && totalMonths > 0 && loanAmount > 0) {
      monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else if (totalMonths > 0) {
      monthlyPI = loanAmount / totalMonths;
    }

    const monthlyTax = annualTax / 12;
    const monthlyInsurance = annualInsurance / 12;

    // PMI required if down payment < 20%
    const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
    const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * 0.0075) / 12 : 0;

    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHoa;

    // Lifetime Stats
    const totalPayments = monthlyPI * totalMonths;
    const totalInterest = Math.max(0, totalPayments - loanAmount);
    const totalCost = totalPayments + downPayment + (monthlyTax + monthlyInsurance + monthlyPMI) * totalMonths;

    // Payoff year
    const currentYear = new Date().getFullYear();
    const payoffYear = currentYear + this.termYears;

    // Update DOM texts
    if (this.totalMonthlyEl) this.totalMonthlyEl.textContent = `$${Math.round(totalMonthly).toLocaleString()}`;
    if (this.piMonthlyEl) this.piMonthlyEl.textContent = `$${Math.round(monthlyPI).toLocaleString()}`;
    if (this.taxMonthlyEl) this.taxMonthlyEl.textContent = `$${Math.round(monthlyTax).toLocaleString()}`;
    if (this.insMonthlyEl) this.insMonthlyEl.textContent = `$${Math.round(monthlyInsurance).toLocaleString()}`;
    if (this.pmiMonthlyEl) this.pmiMonthlyEl.textContent = `$${Math.round(monthlyPMI).toLocaleString()}`;
    if (this.hoaMonthlyEl) this.hoaMonthlyEl.textContent = `$${Math.round(monthlyHoa).toLocaleString()}`;

    if (this.totalLoanAmtEl) this.totalLoanAmtEl.textContent = `$${Math.round(loanAmount).toLocaleString()}`;
    if (this.totalInterestEl) this.totalInterestEl.textContent = `$${Math.round(totalInterest).toLocaleString()}`;
    if (this.totalCostEl) this.totalCostEl.textContent = `$${Math.round(totalCost).toLocaleString()}`;
    if (this.payoffDateEl) this.payoffDateEl.textContent = `${payoffYear}`;

    // Update Donut Chart
    this.updateChart(monthlyPI, monthlyTax, monthlyInsurance, monthlyPMI);

    // Store data for amortization schedule
    this.calcState = {
      loanAmount,
      monthlyRate,
      monthlyPI,
      totalMonths,
      startYear: currentYear
    };

    this.renderAmortization();
  }

  updateChart(pi, tax, ins, pmi) {
    const total = pi + tax + ins + pmi;
    if (total <= 0) return;

    // SVG circle circumference for r = 40 is 2 * PI * 40 ~= 251.327
    const circumference = 251.327;

    const piFrac = pi / total;
    const taxFrac = tax / total;
    const insFrac = ins / total;
    const pmiFrac = pmi / total;

    const piDash = piFrac * circumference;
    const taxDash = taxFrac * circumference;
    const insDash = insFrac * circumference;
    const pmiDash = pmiFrac * circumference;

    let offset = 0;

    if (this.chartSegPI) {
      this.chartSegPI.setAttribute('stroke-dasharray', `${piDash} ${circumference - piDash}`);
      this.chartSegPI.setAttribute('stroke-dashoffset', `${offset}`);
      offset -= piDash;
    }

    if (this.chartSegTax) {
      this.chartSegTax.setAttribute('stroke-dasharray', `${taxDash} ${circumference - taxDash}`);
      this.chartSegTax.setAttribute('stroke-dashoffset', `${offset}`);
      offset -= taxDash;
    }

    if (this.chartSegIns) {
      this.chartSegIns.setAttribute('stroke-dasharray', `${insDash} ${circumference - insDash}`);
      this.chartSegIns.setAttribute('stroke-dashoffset', `${offset}`);
      offset -= insDash;
    }

    if (this.chartSegPMI) {
      this.chartSegPMI.setAttribute('stroke-dasharray', `${pmiDash} ${circumference - pmiDash}`);
      this.chartSegPMI.setAttribute('stroke-dashoffset', `${offset}`);
    }
  }

  renderAmortization() {
    if (!this.amortTableBody || !this.calcState) return;

    const { loanAmount, monthlyRate, monthlyPI, totalMonths, startYear } = this.calcState;
    let balance = loanAmount;
    let totalInterestPaid = 0;

    let html = '';

    if (this.amortMode === 'annual') {
      const years = Math.ceil(totalMonths / 12);

      for (let y = 1; y <= years; y++) {
        let yearPrincipal = 0;
        let yearInterest = 0;

        for (let m = 1; m <= 12; m++) {
          const currentMonth = (y - 1) * 12 + m;
          if (currentMonth > totalMonths || balance <= 0) break;

          const interestPayment = balance * monthlyRate;
          const principalPayment = Math.min(balance, monthlyPI - interestPayment);

          yearInterest += interestPayment;
          yearPrincipal += principalPayment;
          balance -= principalPayment;
        }

        totalInterestPaid += yearInterest;
        const displayYear = startYear + y - 1;

        html += `
          <tr>
            <td><strong>Year ${y}</strong> (${displayYear})</td>
            <td>$${Math.round(yearPrincipal + yearInterest).toLocaleString()}</td>
            <td style="color: var(--primary); font-weight:600;">$${Math.round(yearPrincipal).toLocaleString()}</td>
            <td style="color: var(--accent); font-weight:600;">$${Math.round(yearInterest).toLocaleString()}</td>
            <td>$${Math.round(totalInterestPaid).toLocaleString()}</td>
            <td><strong>$${Math.max(0, Math.round(balance)).toLocaleString()}</strong></td>
          </tr>
        `;

        if (balance <= 0) break;
      }
    } else {
      // Monthly view (first 36 months + summary)
      const limitMonths = Math.min(totalMonths, 36);

      for (let m = 1; m <= limitMonths; m++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(balance, monthlyPI - interestPayment);
        balance -= principalPayment;
        totalInterestPaid += interestPayment;

        html += `
          <tr>
            <td>Month ${m}</td>
            <td>$${Math.round(monthlyPI).toLocaleString()}</td>
            <td style="color: var(--primary); font-weight:600;">$${Math.round(principalPayment).toLocaleString()}</td>
            <td style="color: var(--accent); font-weight:600;">$${Math.round(interestPayment).toLocaleString()}</td>
            <td>$${Math.round(totalInterestPaid).toLocaleString()}</td>
            <td><strong>$${Math.max(0, Math.round(balance)).toLocaleString()}</strong></td>
          </tr>
        `;
      }
    }

    this.amortTableBody.innerHTML = html;
  }
}

// Instantiate on load
document.addEventListener('DOMContentLoaded', () => {
  new MortgageCalculator();
});
