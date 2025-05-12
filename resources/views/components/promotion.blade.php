<div class="bg-blue-600 py-4 px-4 sm:px-20 text-white w-full flex flex-col sm:flex-row items-center">
    <div class="flex-1 flex items-center justify-between gap-1 sm:gap-2 text-xs sm:text-base">
        <div class="w-8/12">
            <span class="text-left  sm:w-full text-xs sm:text-sm font-bold">ÉCONOMISEZ 25% SUR TOUS NOS SERVICES AVANT LE</span>
            <span class="sm:bg-gray-700 px-2 py-1 w-[170px] text-center countdown-timer">00 : 00 : 00 : 00</span>
        </div>

        <button class="bg-gray-100 font-bold hover:bg-gray-200 text-black px-3 sm:px-4 py-1 text-xs sm:text-sm transition-colors">
            SAVE NOW
        </button>
    </div>
</div>

<!-- countdown -->
<script>
    // Check if we already have an end time in localStorage
    let countDownDate = localStorage.getItem('promoEndTime');
    
    // If not, set a new end time (24 hours from now) and store it
    if (!countDownDate) {
        const now = new Date();
        now.setDate(now.getDate() + 3);
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
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.querySelector(".countdown-timer").innerHTML = 
            `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
        
    }, 1000);
</script>