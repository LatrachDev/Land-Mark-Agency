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

    <div class="bg-[url(../LM/BG/Asset7.png)] w-full bg-cover bg-no-repeat">

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

        <!-- Hero Section -->
        <div class="container mx-auto px-4 sm:px-6 mt-20 md:mt-40 w-full md:w-[90%] m-auto">
            <div class="max-w-full">
                <div class="flex justify-start items-center">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                        <div class="w-full relative mb-2">
                            <div class="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-600 h-4 sm:h-5 md:h-6 mt-6 sm:mt-8 md:mt-10 w-full"></div>
                            <div class="relative z-10 px-0 py-2 sm:py-3 md:py-4">
                                <span class="text-white text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide">
                                    L'adoption ou l'adaptation au changement
                                </span>
                            </div>
                        </div>
                        <div class="text-white leading-[1.4em] text-lg sm:text-xl md:text-2xl mb-8 md:mb-12">
                            UNE DÉCISION QUI VOUS RESSEMBLE
                        </div>
                    </h1>
                </div>
                <p class="text-gray-300 mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
                    DÉVELOPPEZ LA NOTORIÉTÉ DE VOTRE MARQUE,<br class="sm:hidden"> 
                    AUGMENTEZ VOS VENTES<br class="hidden sm:block md:hidden">
                    ET CRÉEZ UN LIEN FORT AVEC VOTRE AUDIENCE.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                    <button class="bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:bg-blue-700 hover:scale-105 text-sm sm:text-base md:text-lg">
                        DEMANDEZ VOTRE FACTURE
                    </button>
                    <button class="border border-white text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-sm sm:text-base md:text-lg">
                        VOIR LE PORTFOLIO
                    </button>
                </div>
            </div>
        </div>

        <!-- Mission Section -->
        <div class="container mx-auto py-16 px-10 w-[90%] m-auto">
            <h2 class="text-white text-xl tracking-[0.2em] font-['BioRhyme_Expanded'] mb-6 uppercase pl-0">Notre Mission</h2>
            <div class="relative w-full aspect-video  overflow-hidden">
                <img
                    src="../LM/JPG/video.png"
                    alt="Notre Mission"
                    class="w-full h-full object-cover" />
                <!-- Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <button class="w-16 h-16 rounded-full flex items-center justify-center hover:bg-black/40 transition-all">
                        <img src="LM/Services/videoIcon2.svg" alt="" class="w-12 h-12 rounded-full flex items-center justify-center">
                    </button>
                </div>
            </div>
        </div>
    </div>


    <!-- Services Section -->
    <section class="bg-white py-16 px-6 text-center w-[90%] m-auto">
        <h2 class="text-xl font-bold text-left text-gray-900 uppercase mb-6 font-['BioRhyme_Expanded']">SERVICES</h2>

        <h3 class="text-xl font-bold text-left text-gray-900 uppercase mb-4">
            DES SOLUTIONS COMPLÈTES POUR BOOSTER VOTRE MARQUE ET VOTRE VISIBILITÉ
        </h3>
        <p class="text-gray-600 text-left max-w-2xl mb-12">
            Que vous souhaitiez renforcer votre présence en ligne, bâtir une identité de marque forte ou captiver votre audience avec du contenu créatif, nous offrons des solutions complètes et adaptées.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-12 mx-auto">
            <!-- Service Item -->
            <div class="flex flex-col items-center text-center">
                <img src="LM/Services/marketingIcon.svg" alt="Marketing Icon" class="h-14 mb-2">
                <h4 class="text-lg font-bold text-gray-900 mb-1">ANALYSER LE MARCHÉ</h4>
                <p class="font-semibold text-sm text-gray-600">Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.</p>
            </div>

            <div class="flex flex-col items-center text-center">
                <img src="LM/Services/designIcon.svg" alt="Branding Icon" class="h-14 mb-2">
                <h4 class="text-lg font-bold text-gray-900 mb-1">BRANDING DESIGN</h4>
                <p class="font-semibold text-sm text-gray-600">Create & Launch A Brand That Lasts In The Market.</p>
            </div>

            <div class="flex flex-col items-center text-center">
                <img src="LM/Services/creation.svg" alt="Content Creation Icon" class="h-14 mb-2">
                <h4 class="text-lg font-bold text-gray-900 mb-1">CRÉATION DE CONTENU</h4>
                <p class="font-semibold text-sm text-gray-600">Grow & Scale With Content That Drives Engagement.</p>
            </div>

            <div class="flex flex-col items-center text-center">
                <img src="LM/Services/seo.svg" alt="SEO Icon" class="h-14 mb-2">
                <h4 class="text-lg font-bold text-gray-900 mb-1">SEO & SEA</h4>
                <p class="font-semibold text-sm text-gray-600">Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.</p>
            </div>

            <div class="flex flex-col items-center text-center">
                <img src="LM/Services/ux.svg" alt="UI UX Icon" class="h-14 mb-2">
                <h4 class="text-lg font-bold text-gray-900 mb-1">UI & UX DESIGN</h4>
                <p class="font-semibold text-sm text-gray-600">Create & Launch A Brand That Lasts In The Market.</p>
            </div>

            <div class="flex flex-col items-center text-center">
                <img src="LM/Services/photography.svg" alt="Photography Icon" class="h-14 mb-2">
                <h4 class="text-lg font-bold text-gray-900 mb-1">PHOTOGRAPHIE</h4>
                <p class="font-semibold text-sm text-gray-600">Grow & Scale With Content That Drives Engagement.</p>
            </div>
        </div>
    </section>

    <!-- Projet highlights -->
    <section class=" mx-auto px-4 py-16 bg-white">
        <div class="container w-[90%] m-auto">
            <!-- Section Title -->
            <div class="mb-12 text-left">
                <h2 class="text-2xl font-['BioRhyme_Expanded'] text-blue-900 uppercase">PROJECT HIGHLIGHTS</h2>
                <p class="text-2xl font-['BioRhyme_Expanded'] text-blue-900 mt-2">"CASE STUDIES"</p>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Project 1: Extent Media -->
                <div class="flex flex-col">
                    <div class=" mb-4 rounded-lg">
                        <img src="{{ asset('../LM/Projects/3.png') }}" alt="Extent Media Logo" class="w-full">
                    </div>
                    <h3 class="text-xl font-bold font-['Jost'] mb-2">BRAND DESIGN <span class="italic">"EXTENT MEDIA"</span></h3>
                    <p class="font-['Jost'] text-gray-700 mb-6">
                        Project brief and all aspects of this projects in short word to help understand what we workt on while the project.
                    </p>
                    <div>
                        <p class="text-4xl text-blue-500 font-bold font-['Jost']">45%</p>
                        <p class="font-['Jost']">Website views<br>after rebranding</p>
                    </div>
                </div>

                <!-- Project 2: GrowMax -->
                <div class="flex flex-col">
                    <div class=" mb-4 rounded-lg">
                        <img src="{{ asset('../LM/Projects/2.png') }}" alt="GrowMax Website" class="w-full">
                    </div>
                    <h3 class="text-xl font-bold font-['Jost'] mb-2">UI & UX DESIGN <span class="italic">"GROWMAX"</span></h3>
                    <p class="font-['Jost'] text-gray-700 mb-6">
                        Project brief and all aspects of this projects in short word to help understand what we workt on while the project.
                    </p>
                    <div>
                        <p class="text-4xl text-blue-500 font-bold font-['Jost']">15%</p>
                        <p class="font-['Jost']">Website views<br>after rebranding</p>
                    </div>
                </div>

                <!-- Project 3: Al Ghosne -->
                <div class="flex flex-col">
                    <div class=" mb-4 rounded-lg">
                        <img src="{{ asset('../LM/Projects/1.png') }}" alt="Al Ghosne Packaging" class="w-full">
                    </div>
                    <h3 class="text-xl font-bold font-['Jost'] mb-2">PACKAGING DESIGN <span class="italic">"AL GHOSNE"</span></h3>
                    <p class="font-['Jost'] text-gray-700 mb-6">
                        Project brief and all aspects of this projects in short word to help understand what we workt on while the project.
                    </p>
                    <div>
                        <p class="text-4xl text-blue-500 font-bold font-['Jost']">45%</p>
                        <p class="font-['Jost']">Website views<br>after rebranding</p>
                    </div>
                </div>
            </div>

            <!-- View All Button -->
            <div class="text-left mt-12">
                <a href="#" class="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors">
                    View All Works
                </a>
            </div>
        </div>
    </section>

    <!-- Content creation -->
    <section class=" px-4 py-16 bg-white">

        <div class="container w-[90%] m-auto">
            <div class="mb-12">
                <h2 class="text-xl font-['BioRhyme_Expanded'] text-blue-900 uppercase text-left">CONTENT CREATION</h2>
            </div>

            <!-- Projects Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Project 1 -->
                <div class="flex flex-col">
                    <div class="mb-8">
                        <img src="{{ asset('../LM/ContentCreation/1.png') }}" alt="Content Creator" class="w-full h-auto object-cover">
                    </div>
                    <h3 class="text-xl font-bold font-['Jost'] mb-8">PROJECT NAME</h3>
                    <div>
                        <p class="text-4xl text-blue-500 font-bold font-['Jost']">45%</p>
                        <p class="font-['Jost']">Website views<br>after rebranding</p>
                    </div>
                </div>

                <!-- Project 2 -->
                <div class="flex flex-col">
                    <div class="mb-8">
                        <img src="{{ asset('../LM/ContentCreation/2.png') }}" alt="Content Creator" class="w-full h-auto object-cover">
                    </div>
                    <h3 class="text-xl font-bold font-['Jost'] mb-8">PROJECT NAME</h3>
                    <div>
                        <p class="text-4xl text-blue-500 font-bold font-['Jost']">45%</p>
                        <p class="font-['Jost']">Website views<br>after rebranding</p>
                    </div>
                </div>

                <!-- Project 3 -->
                <div class="flex flex-col">
                    <div class="mb-8">
                        <img src="{{ asset('../LM/ContentCreation/3.png') }}" alt="Content Creator" class="w-full h-auto object-cover">
                    </div>
                    <h3 class="text-xl font-bold font-['Jost'] mb-8">PROJECT NAME</h3>
                    <div>
                        <p class="text-4xl text-blue-500 font-bold font-['Jost']">45%</p>
                        <p class="font-['Jost']">Website views<br>after rebranding</p>
                    </div>
                </div>
            </div>

            <!-- View All Button -->
            <div class="text-left mt-16">
                <a href="#" class="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors">
                    VIEW ALL WORKS
                </a>
            </div>
        </div>
    </section>


    <!-- reviews -->
    <section class="bg-white mx-auto px-4 py-16">
        <div class="container w-[90%] m-auto">
            <div class="mb-12">
                <h2 class="text-xl font-['BioRhyme_Expanded'] text-blue-900 uppercase text-left">OUR BEST CLIENTS REVIEWS</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Review 1 -->
                <div class="bg-gray-100 p-8 rounded-lg">
                    <!-- Quote Mark -->
                    <div class="text-6xl text-indigo-900 font-serif mb-4"><svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.504 13.768V0.807997H31.368V4.168C31.368 9.416 30.952 13.352 30.12 15.976C29.352 18.536 27.24 22.216 23.784 27.016L18.312 23.944C21.192 19.016 22.856 15.624 23.304 13.768H18.504ZM1.032 13.768V0.807997H13.896V4.168C13.896 9.416 13.48 13.352 12.648 15.976C11.88 18.536 9.768 22.216 6.312 27.016L0.84 23.944C3.72 19.016 5.384 15.624 5.832 13.768H1.032Z" fill="#263973" />
                        </svg>
                    </div>

                    <!-- Testimonial Text -->
                    <p class="font-['Jost'] text-gray-800 mb-8">
                        "Project breef and all aspects of this projects in shorte word to help understand what we workt on while the project."
                    </p>

                    <!-- Client Info -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <img src="{{ asset('../LM/reviews/3.png') }}" alt="Mohammed Azzimani" class="w-12 h-12 rounded-full mr-3">
                            <div>
                                <h4 class="font-['Jost'] font-bold">Al Andalous Pack</h4>
                                <p class="font-['Jost'] text-sm text-gray-600">Mohammed Azzimani</p>
                            </div>
                        </div>
                        <img src="{{ asset('../LM/reviews/1.png') }}" alt="Google" class="h-6">
                    </div>
                </div>

                <!-- Review 2 -->
                <div class="bg-gray-100 p-8 rounded-lg">
                    <!-- Quote Mark -->
                    <div class="text-6xl text-indigo-900 font-serif mb-4"><svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.504 13.768V0.807997H31.368V4.168C31.368 9.416 30.952 13.352 30.12 15.976C29.352 18.536 27.24 22.216 23.784 27.016L18.312 23.944C21.192 19.016 22.856 15.624 23.304 13.768H18.504ZM1.032 13.768V0.807997H13.896V4.168C13.896 9.416 13.48 13.352 12.648 15.976C11.88 18.536 9.768 22.216 6.312 27.016L0.84 23.944C3.72 19.016 5.384 15.624 5.832 13.768H1.032Z" fill="#263973" />
                        </svg>
                    </div>

                    <!-- Testimonial Text -->
                    <p class="font-['Jost'] text-gray-800 mb-8">
                        " Project breef and all aspects of this projects in shorte word to help understand what we workt on while the project. "
                    </p>

                    <!-- Client Info -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <img src="{{ asset('../LM/reviews/2.png') }}" alt="Mohammed Azzimani" class="w-12 h-12 rounded-full mr-3">
                            <div>
                                <h4 class="font-['Jost'] font-bold">Growmax</h4>
                                <p class="font-['Jost'] text-sm text-gray-600">Khaoula Touijer</p>
                            </div>
                        </div>
                        <img src="{{ asset('../LM/reviews/1.png') }}" alt="Google" class="h-6">
                    </div>
                </div>

                <!-- Review 3 -->
                <div class="bg-gray-100 p-8 rounded-lg">
                    <!-- Quote Mark -->
                    <div class="text-6xl text-indigo-900 font-serif mb-4"><svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.504 13.768V0.807997H31.368V4.168C31.368 9.416 30.952 13.352 30.12 15.976C29.352 18.536 27.24 22.216 23.784 27.016L18.312 23.944C21.192 19.016 22.856 15.624 23.304 13.768H18.504ZM1.032 13.768V0.807997H13.896V4.168C13.896 9.416 13.48 13.352 12.648 15.976C11.88 18.536 9.768 22.216 6.312 27.016L0.84 23.944C3.72 19.016 5.384 15.624 5.832 13.768H1.032Z" fill="#263973" />
                        </svg>
                    </div>

                    <!-- Testimonial Text -->
                    <p class="font-['Jost'] text-gray-800 mb-8">
                        " Project breef and all aspects of this projects in shorte word to help understand what we workt on while the project. "
                    </p>

                    <!-- Client Info -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <img src="{{ asset('../LM/reviews/4.png') }}" alt="Mohammed Azzimani" class="w-12 h-12 rounded-full mr-3">
                            <div>
                                <h4 class="font-['Jost'] font-bold">Minari</h4>
                                <p class="font-['Jost'] text-sm text-gray-600">Amina Bitari</p>
                            </div>
                        </div>
                        <img src="{{ asset('../LM/reviews/1.png') }}" alt="Google" class="h-6">
                    </div>
                </div>
            </div>
        </div>

    </section>

    <!-- Contact us -->
    <section class="px-4 py-16 bg-[#eeeeee]">
        <div class="container w-[90%] m-auto">
            <div class="mb-12">
                <h2 class="text-xl font-['BioRhyme_Expanded'] text-blue-900 uppercase text-left">Contact us</h2>
            </div>

            <div class="flex flex-col-reverse lg:flex-row gap-8">
                <div class="lg:w-8/12">
                    <h3 class="text-xl font-bold text-left text-gray-900 uppercase mb-4">
                        fill out the form, and we'll contact you.
                    </h3>

                    <div class="w-7/12">
                        <form id="contactForm" action="https://formspree.io/f/xwplbdpq" method="POST" class="space-y-4">
                            <div class="mb-6">
                                <h4 class="font-medium text-gray-900 mb-2">I AM INTERESTED IN:</h4>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <label class="relative">
                                        <input type="checkbox" name="interest[]" value="BRANDING" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                        <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">BRANDING</span>
                                    </label>
                                    <label class="relative">
                                        <input type="checkbox" name="interest[]" value="WEBSITE DESIGN" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                        <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">WEBSITE DESIGN</span>
                                    </label>
                                    <label class="relative">
                                        <input type="checkbox" name="interest[]" value="CONTENT CREATION" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                        <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">CONTENT CREATION</span>
                                    </label>
                                    <label class="relative">
                                        <input type="checkbox" name="interest[]" value="PACKAGING" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                        <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">PACKAGING</span>
                                    </label>
                                    <label class="relative">
                                        <input type="checkbox" name="interest[]" value="OTHER" class="absolute opacity-0 w-full h-full cursor-pointer peer">
                                        <span class="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">OTHER</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <input name="name" placeholder="Full Name" type="text" class="w-full p-2 border-b-2 border-gray-400 bg-transparent" required>
                            </div>

                            <div>
                                <input name="email" placeholder="Email" type="email" class="w-full p-2 border-b-2 border-gray-400 bg-transparent" required>
                            </div>

                            <div>
                                <input name="phone" placeholder="Phone Number" type="tel" class="w-full p-2 border-b-2 border-gray-400 bg-transparent">
                            </div>

                            <div>
                                <input name="company" placeholder="Company Name" type="text" class="w-full p-2 border-b-2 border-gray-400 bg-transparent">
                            </div>

                            <div>
                                <textarea name="message" placeholder="Tell us about your business" class="w-full p-2 border-b-2 border-gray-400 bg-transparent h-24" required></textarea>
                            </div>

                            <p id="form-status" class="text-green-500 text-sm hidden"></p>

                            <button type="submit" class="bg-gray-900 text-white px-8 py-3 uppercase font-medium hover:bg-gray-700 transition-colors">
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </div>

                <div class="lg:w-4/12">
                    <div class="mb-6">
                        <img src="{{ asset('LM/JPG/haytham.jpg') }}" alt="Haytham" class="w-full h-auto">
                    </div>
                    <p class="italic text-justify text-xl text-[#666666] mb-4">
                        Did you know that 4 out of 5 customers switch brands due to poor customer experience and design? <br>
                        At Landmark, we specialize in crafting innovative and trendy visuals that not only captivate but also make your products and projects unforgettable.
                    </p>
                    <h4 class="font-bold text-xl uppercase">HAYTHAM GUERMAH</h4>
                    <p class="font-medium italic text-xs">FOUNDER & CEO OF @LANDMARK</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Latest blog -->
    <section class="px-4 py-16 bg-white">
        <div class="container w-[90%] m-auto">
            <div class="mb-12">
                <h2 class="text-xl font-['BioRhyme_Expanded'] text-blue-900 uppercase text-left">Latest blog</h2>
            </div>

            <!-- Swiper Container -->
            <div class="swiper latestBlogSwiper relative">
                <div class="swiper-wrapper pb-12">
                    <!-- Project 1 -->
                    <div class="swiper-slide flex flex-col">
                        <div class="mb-8 overflow-hidden">
                            <img src="{{ asset('../LM/JPG/me.png') }}" alt="Content Creator" class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105">
                        </div>
                        <h3 class="text-xl font-bold font-['Jost'] mb-4">PROJECT NAME</h3>
                        <p class="font-['Jost'] mb-4">Project brief and all aspects of this projects in short words to help understand what we worked on while the project.</p>

                    </div>

                    <!-- Project 2 -->
                    <div class="swiper-slide flex flex-col">
                        <div class="mb-8 overflow-hidden">
                            <img src="{{ asset('../LM/JPG/me.png') }}" alt="Content Creator" class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105">
                        </div>
                        <h3 class="text-xl font-bold font-['Jost'] mb-4">PROJECT NAME</h3>
                        <p class="font-['Jost'] mb-4">Project brief and all aspects of this projects in short words to help understand what we worked on while the project.</p>

                    </div>

                    <!-- Project 3 -->
                    <div class="swiper-slide flex flex-col">
                        <div class="mb-8 overflow-hidden">
                            <img src="{{ asset('../LM/JPG/me.png') }}" alt="Content Creator" class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105">
                        </div>
                        <h3 class="text-xl font-bold font-['Jost'] mb-4">PROJECT NAME</h3>
                        <p class="font-['Jost'] mb-4">Project brief and all aspects of this projects in short words to help understand what we worked on while the project.</p>

                    </div>

                    <!-- Project 4 -->
                    <div class="swiper-slide flex flex-col">
                        <div class="mb-8 overflow-hidden">
                            <img src="{{ asset('../LM/JPG/me.png') }}" alt="Content Creator" class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105">
                        </div>
                        <h3 class="text-xl font-bold font-['Jost'] mb-4">PROJECT NAME</h3>
                        <p class="font-['Jost'] mb-4">Project brief and all aspects of this projects in short words to help understand what we worked on while the project.</p>

                    </div>

                    <!-- Project 5 -->
                    <div class="swiper-slide flex flex-col">
                        <div class="mb-8 overflow-hidden">
                            <img src="{{ asset('../LM/JPG/me.png') }}" alt="Content Creator" class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105">
                        </div>
                        <h3 class="text-xl font-bold font-['Jost'] mb-4">PROJECT NAME</h3>
                        <p class="font-['Jost'] mb-4">Project brief and all aspects of this projects in short words to help understand what we worked on while the project.</p>

                    </div>

                    <!-- Project 6 -->
                    <div class="swiper-slide flex flex-col">
                        <div class="mb-8 overflow-hidden">
                            <img src="{{ asset('../LM/JPG/me.png') }}" alt="Content Creator" class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105">
                        </div>
                        <h3 class="text-xl font-bold font-['Jost'] mb-4">PROJECT NAME</h3>
                        <p class="font-['Jost'] mb-4">Project brief and all aspects of this projects in short words to help understand what we worked on while the project.</p>

                    </div>

                    <!-- Project 7 -->
                    <div class="swiper-slide flex flex-col">
                        <div class="mb-8 overflow-hidden">
                            <img src="{{ asset('../LM/JPG/me.png') }}" alt="Content Creator" class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105">
                        </div>
                        <h3 class="text-xl font-bold font-['Jost'] mb-4">PROJECT NAME</h3>
                        <p class="font-['Jost'] mb-4">Project brief and all aspects of this projects in short words to help understand what we worked on while the project.</p>

                    </div>

                </div>

                <!-- Swiper Navigation -->
                <div class="swiper-button-next after:text-gray-800"></div>
                <div class="swiper-button-prev after:text-gray-800"></div>

            </div>

            <!-- View All Button -->
            <div class="text-left">
                <a href="#" class="inline-block border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors">
                    read more
                </a>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="px-4 py-16 bg-white">
        <div class="container w-[90%] m-auto">
            <div class="mb-12">
                <h2 class="text-xl font-['BioRhyme_Expanded'] text-blue-900 uppercase text-left">FAQ’s</h2>
            </div>

            <div class="space-y-4">
                <!-- ANALYSER LE MARCHÉ Section -->
                <div class="border-b border-gray-300 pb-4">
                    <button class="cursor-pointer faq-toggle w-full text-left flex justify-between items-center py-4" aria-expanded="false" aria-controls="analyser-content">
                        <h3 class="text-lg font-bold uppercase">ANALYSER LE MARCHÉ</h3>
                        <svg class="w-6 h-6 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    <div id="analyser-content" class="hidden faq-content pl-4">
                        <p class="text-lg mb-4">Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.</p>
                        <ul class="space-y-2 pl-5 list-disc">
                            <li>Se plonger dans l'étude de marché</li>
                            <li>Connaître votre clientèle</li>
                            <li>Évaluez vos concurrents</li>
                            <li>Trouvez vos points forts et corrigez vos points faibles</li>
                            <li>Identifier les lacunes du marché</li>
                            <li>Se démarquer</li>
                        </ul>
                    </div>
                </div>

                <!-- BRANDING DESIGN Section -->
                <div class="border-b border-gray-300 pb-4">
                    <button class="cursor-pointer faq-toggle w-full text-left flex justify-between items-center py-4" aria-expanded="false" aria-controls="branding-content">
                        <h3 class="text-lg font-bold uppercase">BRANDING DESIGN</h3>
                        <svg class="w-6 h-6 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    <div id="branding-content" class="hidden faq-content pl-4">
                        <p class="text-lg mb-4">Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.</p>
                        <ul class="space-y-2 pl-5 list-disc">
                            <li>Se plonger dans l'étude de marché</li>
                            <li>Connaître votre clientèle</li>
                            <li>Évaluez vos concurrents</li>
                            <li>Trouvez vos points forts et corrigez vos points faibles</li>
                            <li>Identifier les lacunes du marché</li>
                            <li>Se démarquer</li>
                        </ul>
                    </div>
                </div>

                <!-- CRÉATION DE CONTENU Section -->
                <div class="border-b border-gray-300 pb-4">
                    <button class=" cursor-pointer faq-toggle w-full text-left flex justify-between items-center py-4" aria-expanded="false" aria-controls="content-creation-content">
                        <h3 class="text-lg font-bold uppercase">CRÉATION DE CONTENU</h3>
                        <svg class="w-6 h-6 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    <div id="content-creation-content" class="hidden faq-content pl-4">
                        <p class="text-lg mb-4">Une Voie Claire & Ciblée Pour Lancer Votre Entreprise.</p>
                        <ul class="space-y-2 pl-5 list-disc">
                            <li>Se plonger dans l'étude de marché</li>
                            <li>Connaître votre clientèle</li>
                            <li>Évaluez vos concurrents</li>
                            <li>Trouvez vos points forts et corrigez vos points faibles</li>
                            <li>Identifier les lacunes du marché</li>
                            <li>Se démarquer</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[url(../LM/BG/footer.jpg)] bg-cover bg-center w-full text-white font-['Jost'] pt-12 md:pt-20 pb-6 md:pb-10 px-4 md:px-8 lg:px-20">
        <div class="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
            <!-- Logo -->
            <img class="w-48 md:w-64 mb-12 md:mb-20" src="{{ asset('LM/Logotype/White.png') }}" alt="Landmark logo">

            <div class="flex flex-col lg:flex-row gap-8 md:gap-12">
                <!-- Left Section -->
                <div class="lg:w-7/12">
                    <h2 class="text-xl sm:text-4xl font-bold uppercase mb-4 md:mb-6 tracking-wide text-left">READY TO GET STARTED?</h2>
                    <p class="text-base md:text-lg text-left lg:text-justify w-full lg:w-10/12 mb-6 md:mb-8 tracking-wider uppercase font-light">
                        Through a customer satisfaction survey. 96% of our clients express strong satisfaction and would confidently recommend our services to others.
                    </p>
                    <div class="text-left">
                        <a href="#" class="inline-block border border-white text-white px-8 py-3 md:px-10 md:py-4 uppercase font-normal text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
                            GET IN TOUCH
                        </a>
                    </div>
                </div>

                <!-- Right Section -->
                <div class="lg:w-5/12 flex flex-col md:flex-row lg:flex-col gap-8 md:gap-12">
                    <!-- Social Media -->
                    <div class="w-full md:w-1/2 lg:w-full">
                        <p class="uppercase mb-3 text-sm tracking-wider font-['BioRhyme_Expanded'] text-left">FOLLOW US FOR DAILY CONTENT</p>
                        <div class="flex md:justify-start space-x-6 text-xl mt-6 md:mt-10">
                            <a href="#" class="hover:opacity-70 transition-opacity" aria-label="Facebook">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="#" class="hover:opacity-70 transition-opacity" aria-label="Instagram">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" class="hover:opacity-70 transition-opacity" aria-label="LinkedIn">
                                <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="#" class="hover:opacity-70 transition-opacity" aria-label="Behance">
                                <i class="fa-brands fa-behance"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="w-full md:w-1/2 lg:w-full">
                        <p class="font-bold uppercase mb-3 text-sm tracking-wider font-['BioRhyme_Expanded'] text-left">NAVIGATION</p>
                        <ul class="space-y-2 mt-6 md:mt-10 text-left">
                            <li><a href="#" class="font-bold text-sm hover:opacity-70 hover:border-b-2 hover:border-[#445ef2] transition-opacity block w-fit md:mx-0">WORK</a></li>
                            <li><a href="#" class="font-bold text-sm hover:opacity-70 hover:border-b-2 hover:border-[#445ef2] transition-opacity block w-fit md:mx-0">SERVICES</a></li>
                            <li><a href="#" class="font-bold text-sm hover:opacity-70 hover:border-b-2 hover:border-[#445ef2] transition-opacity block w-fit md:mx-0">ABOUT US</a></li>
                            <li><a href="#" class="font-bold text-sm hover:opacity-70 hover:border-b-2 hover:border-[#445ef2] transition-opacity block w-fit md:mx-0">CONTACT US</a></li>
                            <li><a href="#" class="font-bold text-sm hover:opacity-70 hover:border-b-2 hover:border-[#445ef2] transition-opacity block w-fit md:mx-0">BLOG</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mt-8 md:mt-12 text-sm md:text-base lg:text-xl">
                Copyright © 2025 all rights reserved
            </div>
        </div>
    </footer>

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