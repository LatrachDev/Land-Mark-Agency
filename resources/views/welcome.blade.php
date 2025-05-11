<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landmark</title>
    <script src="js/tailwind.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=BioRhyme+Expanded:wght@200;300;400;700;800&family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <style>
        .swiper {
            width: 100%;
            height: 100%;
        }

        .swiper-slide {
            height: auto;
        }

        .swiper-button-next,
        .swiper-button-prev {
            width: 40px;
            height: 40px;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            top: 40%;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
            font-size: 18px;
            font-weight: bold;
        }

        .swiper-pagination-bullet-active {
            background-color: #1a365d;
            /* blue-900 */
        }
        .rotate-180 {
            transform: rotate(0deg);
        }
    </style>
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
</head>

<body class="font-['Jost']">

    <!-- Banner Promotion -->
    <x-promotion></x-promotion>

    <div class="bg-[url(../LM/BG/Asset7.png)] w-full bg-cover bg-no-repeat">

        <!-- Navbar -->
        <x-nav></x-nav>

        <!-- Hero Section -->
        <x-hero></x-hero>

        <!-- Mission Section -->
        <x-mission></x-mission>

    </div>


    <!-- Services Section -->
    <x-services></x-services>

    <!-- Projet highlights -->
    <x-projects></x-projects>

    <!-- Content creation -->
    <x-content></x-content>


    <!-- reviews -->
    <x-reviews></x-reviews>

    <!-- Contact us -->
    <x-contact></x-contact>

    <!-- Latest blog -->
    <x-blog></x-blog>

    <!-- FAQ Section -->
    <x-faq></x-faq>

    <!-- Footer -->
    <x-footer></x-footer>

    <!-- faq's -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const toggles = document.querySelectorAll('.faq-toggle');

            toggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const content = document.getElementById(this.getAttribute('aria-controls'));
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';

                    // Toggle content visibility
                    content.classList.toggle('hidden');

                    // Toggle arrow rotation
                    const arrow = this.querySelector('svg');
                    arrow.classList.toggle('rotate-180');

                    // Update aria-expanded attribute
                    this.setAttribute('aria-expanded', !isExpanded);

                    // Close other open sections if needed
                    if (!isExpanded) {
                        toggles.forEach(otherToggle => {
                            if (otherToggle !== toggle) {
                                const otherContent = document.getElementById(otherToggle.getAttribute('aria-controls'));
                                otherContent.classList.add('hidden');
                                otherToggle.setAttribute('aria-expanded', 'false');
                                otherToggle.querySelector('svg').classList.remove('rotate-180');
                            }
                        });
                    }
                });
            });
        });
    </script>


    <!-- swiper -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const swiper = new Swiper('.latestBlogSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    }
                }
            });
        });
    </script>

    <!-- nav -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        });
    </script>

    <!-- email form -->
    <script>
        var form = document.getElementById("contactForm");

        async function handleSubmit(event) {
            event.preventDefault();
            var submitButton = event.target.querySelector('button[type="submit"]');
            var status = document.getElementById("form-status");

            // Change button text
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending...';

            // Reset status
            status.classList.add('hidden');
            status.classList.remove('text-red-500');
            status.classList.remove('text-green-500');

            try {
                var data = new FormData(event.target);
                var response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.innerHTML = "Thank you! Your message has been sent successfully.";
                    status.classList.remove('hidden');
                    status.classList.add('text-green-500');
                    form.reset();
                } else {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        status.innerHTML = errorData.errors.map(error => error.message).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form. Please try again.";
                    }
                    status.classList.remove('hidden');
                    status.classList.add('text-red-500');
                }
            } catch (error) {
                status.innerHTML = "Oops! There was a problem submitting your form. Please try again.";
                status.classList.remove('hidden');
                status.classList.add('text-red-500');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'SUBMIT';
            }
        }

        form.addEventListener("submit", handleSubmit);
    </script>

    <!-- countdown -->
    <script>
        // Check if we already have an end time in localStorage
        let countDownDate = localStorage.getItem('promoEndTime');
        
        // If not, set a new end time (24 hours from now) and store it
        if (!countDownDate) {
            const now = new Date();
            now.setHours(now.getHours() + 24);
            countDownDate = now.getTime();
            localStorage.setItem('promoEndTime', countDownDate);
        } else {
            countDownDate = parseInt(countDownDate);
        }

        // Update the countdown every 1 second
        const x = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the countdown date
            const distance = countDownDate - now;
            
            // If the countdown is finished, clear everything
            if (distance < 0) {
                clearInterval(x);
                document.querySelector(".countdown-timer").innerHTML = "EXPIRED";
                localStorage.removeItem('promoEndTime');
                return;
            }
            
            // Time calculations for hours, minutes and seconds
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            document.querySelector(".countdown-timer").innerHTML = 
                `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
            
        }, 1000);
    </script>
</body>

</html>