/**
 * MORTGAGE BROKER - MAIN JS
 * Exact match for Ralo layout, animations, carousels, and interactive mortgage calculations.
 * Completely standalone without WordPress or Elementor dependencies.
 */

(function ($) {
    'use strict';

    $(document).ready(function () {

        // Preloader
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }

        // Offcanvas Responsive Menu Accordion
        const list = document.querySelectorAll('.offcanvas-body .menu-item');
        function accordion(e) {
            e.stopPropagation();
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else if (this.parentElement.parentElement && this.parentElement.parentElement.classList.contains('active')) {
                this.classList.add('active');
            } else {
                for (let j = 0; j < list.length; j++) {
                    list[j].classList.remove('active');
                }
                this.classList.add('active');
            }
        }
        for (let j = 0; j < list.length; j++) {
            list[j].addEventListener('click', accordion);
        }

        // Mobile Nav Drawer Toggle
        $(document).on('click', '.navbar-toggler, [data-bs-toggle="offcanvas"]', function (e) {
            e.preventDefault();
            $('#responsiveMenu, .offcanvas').toggleClass('show');
            $('body').toggleClass('offcanvas-open');
        });

        $(document).on('click', '.btn-close, .offcanvas-backdrop', function () {
            $('#responsiveMenu, .offcanvas').removeClass('show');
            $('body').removeClass('offcanvas-open');
        });

        // Popup Video
        if ($.fn.magnificPopup) {
            $('.video-btn').magnificPopup({
                disableOn: 320,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

        // Go to Top
        $(window).on('scroll', function () {
            var scrolled = $(window).scrollTop();
            if (scrolled > 300) {
                $('#backtotop').addClass('active');
            } else {
                $('#backtotop').removeClass('active');
            }
        });

        $('#backtotop').on('click', function () {
            $('html, body').animate({ scrollTop: '0' }, 500);
        });

        // Search Toggler
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

        // Odometer / Counters
        if ('IntersectionObserver' in window) {
            let counterObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        let counter = entry.target;
                        let target = parseInt(counter.innerText, 10);
                        if (!isNaN(target)) {
                            let step = Math.max(1, target / 200);
                            let current = 0;
                            let timer = setInterval(function () {
                                current += step;
                                counter.innerText = Math.floor(current);
                                if (parseInt(counter.innerText, 10) >= target) {
                                    clearInterval(timer);
                                    counter.innerText = target;
                                }
                            }, 10);
                        }
                        counterObserver.unobserve(counter);
                    }
                });
            });
            let counters = document.querySelectorAll('.counter');
            counters.forEach(function (counter) {
                counterObserver.observe(counter);
            });
        }

        // Initialize All Owl Carousels directly
        if ($.fn.owlCarousel) {

            // Banner Slide JS
            if ($('.owl-banner-slide').length) {
                $('.owl-banner-slide').owlCarousel({
                    loop: true,
                    margin: 0,
                    items: 1,
                    autoHeight: true,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 6000,
                    autoplayHoverPause: true,
                    navText: [
                        "<i class='flaticon-left-arrow'></i>",
                        "<i class='flaticon-right-arrow'></i>"
                    ]
                });
            }

            // Partner Slide JS
            if ($('.owl-partner-slide').length) {
                $('.owl-partner-slide').owlCarousel({
                    loop: true,
                    margin: 24,
                    autoHeight: true,
                    nav: false,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 2 },
                        576: { items: 4 },
                        768: { items: 5 },
                        992: { items: 6 },
                        1200: { items: 7.5 },
                        1440: { items: 7.5 },
                        1600: { items: 7.5 }
                    }
                });
            }

            // Testimonials Slide JS
            if ($('.owl-testimonials-slide').length) {
                $('.owl-testimonials-slide').owlCarousel({
                    loop: true,
                    margin: 0,
                    items: 1,
                    autoHeight: true,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 7000,
                    autoplayHoverPause: true,
                    navText: [
                        "<i class='flaticon-left-arrow'></i>",
                        "<i class='flaticon-right-arrow'></i>"
                    ]
                });
            }

            // Testimonials Slide Two JS
            if ($('.owl-testimonials-slide-two').length) {
                $('.owl-testimonials-slide-two').owlCarousel({
                    loop: true,
                    margin: 25,
                    autoHeight: true,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 1.5 },
                        768: { items: 2 },
                        992: { items: 2 },
                        1200: { items: 2 },
                        1440: { items: 2 },
                        1600: { items: 2 }
                    },
                    navText: [
                        "<i class='flaticon-left-arrow'></i>",
                        "<i class='flaticon-right-arrow'></i>"
                    ]
                });
            }

            // Buying Slide JS
            if ($('.owl-buying-slider').length) {
                $('.owl-buying-slider').owlCarousel({
                    loop: true,
                    margin: 20,
                    nav: true,
                    dots: false,
                    autoplay: true,
                    smartSpeed: 1000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 1.5 },
                        768: { items: 2 },
                        992: { items: 2.5 },
                        1440: { items: 3.5 },
                        1600: { items: 3.5 }
                    },
                    navText: [
                        "<i class='flaticon-left-arrow'></i>",
                        "<i class='flaticon-right-arrow'></i>"
                    ]
                });
            }

            // Blog Slide JS
            if ($('.owl-blog-slider').length) {
                $('.owl-blog-slider').owlCarousel({
                    loop: true,
                    margin: 20,
                    autoHeight: true,
                    nav: false,
                    dots: true,
                    autoplay: true,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 1.5 },
                        768: { items: 2 },
                        992: { items: 2.5 },
                        1440: { items: 3.5 },
                        1600: { items: 3.5 }
                    }
                });
            }
        }

        // Mortgage Calculator Functionality
        function runMortgageCalculation() {
            const totalAmount = parseFloat($('#total-amount, input[name="total-amount"]').val()) || 30000;
            const interestRate = parseFloat($('#interest-rate, input[name="interest-rate"]').val()) || 4;
            const downPayment = parseFloat($('#down-payment, input[name="down-payment"]').val()) || 6000;
            const periodYears = parseFloat($('#mortgage-period, input[name="mortgage-period"]').val()) || 30;

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

        $('form.mortgage-calc-form, #mortgageForm').on('submit', function (e) {
            e.preventDefault();
            runMortgageCalculation();
        });

        $('#total-amount, #interest-rate, #down-payment, #mortgage-period').on('input', function () {
            runMortgageCalculation();
        });

        if ($('#total-amount').length || $('input[name="total-amount"]').length) {
            runMortgageCalculation();
        }
    });

})(jQuery);
