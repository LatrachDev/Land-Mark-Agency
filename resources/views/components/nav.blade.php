<!-- Navbar -->
<nav class="w-[90%] m-auto">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
            <!-- Logo -->
            <a href="#" class="flex items-center">
                <img src="../LM/Logotype/White.png" alt="Landmark" class="h-10 md:min-w-[200px] md:h-14">
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center space-x-6 lg:space-x-8">
                <div class="flex justify-between space-x-6 lg:space-x-8">
                    <a href="#" class="text-white text-sm md:text-base relative group">
                        PORTFOLIO
                        <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                    </a>
                    <a href="#" class="text-white text-sm md:text-base relative group">
                        SERVICES
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#" class="text-white text-sm md:text-base relative group">
                        À PROPOS DE NOUS
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#" class="text-white text-sm md:text-base relative group">
                        BLOG
                        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>
                <button class="bg-transparent text-white text-sm md:text-base px-4 py-1.5 border border-white transition-all duration-300 hover:border-blue-600 whitespace-nowrap">
                    CONSULTATION GRATUITE
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <button class="lg:hidden text-white focus:outline-none" id="mobile-menu-button">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div class="lg:hidden hidden h-screen pt-4 pb-2" id="mobile-menu">
            <div class="flex flex-col space-y-4">
                <a href="#" class="text-white text-base relative block py-2">
                    PORTFOLIO
                    <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                </a>
                <a href="#" class="text-white text-base relative block py-2 group">
                    SERVICES
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" class="text-white text-base relative block py-2 group">
                    À PROPOS DE NOUS
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" class="text-white text-base relative block py-2 group">
                    BLOG
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <button class="bg-transparent text-white text-base px-4 py-2 border border-white transition-all duration-300 hover:border-blue-600 w-full mt-2">
                    CONSULTATION GRATUITE
                </button>
            </div>
        </div>
    </div>
</nav>