<!-- Navbar -->
<nav class="w-[90%] m-auto">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
            <!-- Logo -->
            <a href="#" class="flex items-center">
                <img src="{{ request()->routeIs('home') ? '../LM/Logotype/White.png' : '../LM/Logotype/Main.png' }}" alt="Landmark" class="h-10 md:min-w-[200px] md:h-14">
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center space-x-6 lg:space-x-8 {{ request()->routeIs('home') ? 'text-white' : 'text-black' }}">

                <div class="flex justify-between space-x-6 lg:space-x-8">

                    <a href="{{ route('home') }}"
                    class=" text-sm md:text-base relative group {{ request()->routeIs('home') ? 'font-semibold' : '' }}">
                        PORTFOLIO
                        <span class="absolute bottom-0 left-0 {{ request()->routeIs('home') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>

                    <a href="{{ route('services') }}"
                    class=" text-sm md:text-base relative group {{ request()->routeIs('services') ? 'font-semibold' : '' }}">
                        SERVICES
                        <span class="absolute bottom-0 left-0 {{ request()->routeIs('services') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>

                    <a href="{{ route('about') }}"
                    class=" text-sm md:text-base relative group {{ request()->routeIs('about') ? 'font-semibold' : '' }}">
                        À PROPOS DE NOUS
                        <span class="absolute bottom-0 left-0 {{ request()->routeIs('about') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>

                    <a href="{{ route('blog') }}"
                    class=" text-sm md:text-base relative group {{ request()->routeIs('blog') ? 'font-semibold' : '' }}">
                        BLOG
                        <span class="absolute bottom-0 left-0 {{ request()->routeIs('blog') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>

                </div>

                <button class="bg-transparent {{ request()->routeIs('home') ? 'text-white border-white' : 'text-black border-black' }} border text-sm md:text-base px-4 py-1.5 transition-all duration-300 hover:border-blue-600 whitespace-nowrap">
                    CONSULTATION GRATUITE
                </button>


            </div>


            <!-- Mobile Menu Button -->
           <button class="lg:hidden {{ request()->routeIs('home') ? 'text-white' : 'text-black' }} focus:outline-none" id="mobile-menu-button">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div class="lg:hidden hidden h-screen pt-4 pb-2" id="mobile-menu">
            <div class="flex flex-col space-y-4">
                @php
                    $isHome = request()->routeIs('home');
                    $textClass = $isHome ? 'text-white' : 'text-black';
                    $borderClass = $isHome ? 'border-white' : 'border-black';
                @endphp

                <a href="{{ route('home') }}"
                class="text-base relative block py-2 group {{ $textClass }} {{ request()->routeIs('home') ? 'font-semibold' : '' }}">
                    PORTFOLIO
                    <span class="absolute bottom-0 left-0 {{ request()->routeIs('home') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a href="{{ route('services') }}"
                class="text-base relative block py-2 group {{ $textClass }} {{ request()->routeIs('services') ? 'font-semibold' : '' }}">
                    SERVICES
                    <span class="absolute bottom-0 left-0 {{ request()->routeIs('services') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a href="{{ route('about') }}"
                class="text-base relative block py-2 group {{ $textClass }} {{ request()->routeIs('about') ? 'font-semibold' : '' }}">
                    À PROPOS DE NOUS
                    <span class="absolute bottom-0 left-0 {{ request()->routeIs('about') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a href="{{ route('blog') }}"
                class="text-base relative block py-2 group {{ $textClass }} {{ request()->routeIs('blog') ? 'font-semibold' : '' }}">
                    BLOG
                    <span class="absolute bottom-0 left-0 {{ request()->routeIs('blog') ? 'w-full' : 'w-0' }} h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>

                <button
                    class="bg-transparent {{ $textClass }} text-base px-4 py-2 border {{ $borderClass }} transition-all duration-300 hover:border-blue-600 w-full mt-2">
                    CONSULTATION GRATUITE
                </button>
            </div>
        </div>


    </div>
</nav>

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