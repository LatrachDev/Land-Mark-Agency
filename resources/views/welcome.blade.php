<!DOCTYPE html>
<html lang="en">

<x-head title="Landmark" />


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

  
</body>

</html>