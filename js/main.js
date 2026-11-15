/**
 * MORTGAGE BROKER - MAIN JS
 * Exact match for Ralo layout, animations, carousels, and interactive mortgage calculations.
 * Completely standalone without WordPress or Elementor dependencies.
 */

$(function () {
    'use strict';

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }

    // Banner Slide Owl Carousel
    if ($('.owl-banner-slide').length) {
        $('.owl-banner-slide').owlCarousel({
            loop: true,
            margin: 0,
            items: 1,
            autoHeight: true,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            navText: [
                "<i class='flaticon-left-arrow'></i>",
                "<i class='flaticon-right-arrow'></i>"
            ],
        });
    }

    // Partner Logos Slide Owl Carousel
    if ($('.owl-partner-slide').length) {
        $('.owl-partner-slide').owlCarousel({
            loop: true,
            margin: 24,
            autoHeight: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 2 },
                576: { items: 4 },
                768: { items: 5 },
                992: { items: 6 },
                1200: { items: 7.5 }
            }
        });
    }

    // Testimonials Slide Owl Carousel
    if ($('.owl-testimonials-slide').length) {
        $('.owl-testimonials-slide').owlCarousel({
            loop: true,
            margin: 0,
            items: 1,
            autoHeight: true,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            navText: [
                "<i class='flaticon-left-arrow'></i>",
                "<i class='flaticon-right-arrow'></i>"
            ],
        });
    }

    // Back to Top Button
    $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('#backtotop').addClass('active');
        if (scrolled < 300) $('#backtotop').removeClass('active');
    });

    $('#backtotop').on('click', function () {
        $('html, body').animate({ scrollTop: '0' }, 500);
    });

    // Search Popup Toggle
    const searchTogglers = document.querySelectorAll('.search-toggler');
    if (searchTogglers.length > 0) {
        searchTogglers.forEach((searchToggler) => {
            searchToggler.addEventListener('click', function (e) {
                e.preventDefault();
                const searchPopup = document.querySelector('.search-popup');
                if (searchPopup) {
                    searchPopup.classList.toggle('active');
                }
            });
        });
    }

    const searchCloses = document.querySelectorAll('.search-close-btn');
    searchCloses.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const searchPopup = document.querySelector('.search-popup');
            if (searchPopup) {
                searchPopup.classList.remove('active');
            }
        });
    });

    // Odometer / Stat Counter Animation
    if ('IntersectionObserver' in window) {
        let counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let counter = entry.target;
                    let target = parseInt(counter.innerText, 10);
                    if (!isNaN(target)) {
                        let step = Math.max(1, target / 100);
                        let current = 0;
                        let timer = setInterval(function () {
                            current += step;
                            counter.innerText = Math.floor(current);
                            if (parseInt(counter.innerText, 10) >= target) {
                                clearInterval(timer);
                                counter.innerText = target;
                            }
                        }, 15);
                    }
                    counterObserver.unobserve(counter);
                }
            });
        });
        document.querySelectorAll('.counter').forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    // Mortgage Calculator Functionality
    function runMortgageCalculation() {
        const totalAmount = parseFloat($('#total-amount').val()) || 30000;
        const interestRate = parseFloat($('#interest-rate').val()) || 4;
        const downPayment = parseFloat($('#down-payment').val()) || 6000;
        const periodYears = parseFloat($('#mortgage-period').val()) || 30;

        const principal = Math.max(0, totalAmount - downPayment);
        const monthlyRate = (interestRate / 100) / 12;
        const numPayments = periodYears * 12;

        let monthly = 0;
        if (monthlyRate > 0 && numPayments > 0) {
            monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        } else if (numPayments > 0) {
            monthly = principal / numPayments;
        }

        const totalPayments = monthly * numPayments;
        const totalInterest = Math.max(0, totalPayments - principal);

        $('#monthly-result-val').text('$' + Math.round(monthly).toLocaleString());
        $('#total-interest-val').text('$' + Math.round(totalInterest).toLocaleString());
        $('#calc-result-box').slideDown();
    }

    // Form submit or live input calculation
    $('form.mortgage-calc-form, #mortgageForm').on('submit', function (e) {
        e.preventDefault();
        runMortgageCalculation();
    });

    $('#total-amount, #interest-rate, #down-payment, #mortgage-period').on('input', function () {
        runMortgageCalculation();
    });

    // Run initial calculation on page load
    if ($('#total-amount').length) {
        runMortgageCalculation();
    }
});
