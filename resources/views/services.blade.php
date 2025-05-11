<!DOCTYPE html>
<html lang="en">

<x-head title="Landmark - Services" />


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