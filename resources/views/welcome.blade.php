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
    <link href="https://fonts.googleapis.com/css2?family=BioRhyme+Expanded:wght@200;300;400;700;800&family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
</head>
<body class="bg-[url(../LM/BG/Asset7.png)] w-full h-screen bg-cover font-['Jost']">
    <!-- Banner Promotion -->
    <div class="bg-blue-600 text-white py-2 w-full flex items-center">
        <div class="flex-1 flex justify-center items-center gap-2">
            <span>ÉCONOMISEZ 25% SUR TOUS NOS SERVICES AVANT LE</span>
            <span class="bg-gray-700 px-2 py-1 rounded">02 : 13 : 57 : 45</span>
        </div>
        <div class="pr-8">
            <button class="bg-gray-100 text-black px-4 py-1 rounded text-sm font-medium">
                SAVE NOW
            </button>
        </div>
    </div>

    <!-- Navbar -->
    <nav >
        <div class="container mx-auto px-8 py-6">
            <div class="flex  justify-center items-center space-x-11 font-bold">
                <!-- Logo -->
                <a href="#" class="flex items-center mr-8">
                    <img src="../LM/Logotype/White.png" alt="Landmark" class="h-14">
                </a>
                
                <a href="#" class="text-white text-sm relative">
                    PORTFOLIO
                    <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                </a>
                <a href="#" class="text-white text-sm relative group">
                    SERVICES
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" class="text-white text-sm relative group">
                    À PROPOS DE NOUS
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#" class="text-white text-sm relative group">
                    BLOG
                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <button class="bg-transparent text-white text-sm px-4 py-1.5 rounded border border-white transition-all duration-300  hover:border-blue-600">
                    CONSULTATION GRATUITE
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-6 mt-20">
        <div class="max-w-3xl">
            <div class="flex justify-center items-center">
                <h1 class="text-4xl md:text-5xl font-bold mb-6">
                    <div class="text-white">
                        <span class="bg-gradient-to-r from-blue-950 to-blue-600 px-4 py-2 ">L'ADOPTION OU L'ADAPTATION</span>
                    </div>
                    <div class="text-white mt-4">UNE DÉCISION QUI VOUS RESSEMBLE</div>
                </h1>
            </div>
            <p class="text-gray-300 mb-8">
                DÉVELOPPEZ LA NOTORIÉTÉ DE VOTRE MARQUE, AUGMENTEZ VOS VENTES<br>
                ET CRÉEZ UN LIEN FORT AVEC VOTRE AUDIENCE.
            </p>
            <div class="flex space-x-4">
                <button class="bg-blue-600 text-white px-6 py-3 rounded transition-all duration-300 hover:bg-blue-700 hover:scale-105">
                    DEMANDEZ VOTRE FACTURE
                </button>
                <button class="border border-white text-white px-6 py-3 rounded transition-all duration-300 hover:bg-white hover:text-black hover:scale-105">
                    VOIR LE PORTFOLIO
                </button>
            </div>
        </div>
    </div>

    <!-- Mission Section -->
    <div class="container mx-auto px-20 mt-32">
        <h2 class="text-white text-xl tracking-[0.2em] font-['BioRhyme_Expanded'] mb-6 uppercase pl-2">Notre Mission</h2>
        <div class="relative w-full aspect-video rounded-xl overflow-hidden">
            <img 
                src="../LM/JPG/video.png" 
                alt="Notre Mission" 
                class="w-full h-full object-cover"
            />
            <!-- Play Button Overlay -->
            <div class="absolute inset-0 flex items-center justify-center">
                <button class="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/40 transition-all">
                    <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    </div>


    <!-- Services Section -->
    <div class="bg-white py-16 px-8 text-center">
        <h2 class="text-xl font-bold text-left text-gray-900 uppercase mb-6 font-['BioRhyme_Expanded']">SERVICES</h2>
        
        <h3 class="text-xl font-bold text-left text-gray-900 uppercase mb-4">
            DES SOLUTIONS COMPLÈTES POUR BOOSTER VOTRE MARQUE ET VOTRE VISIBILITÉ
        </h3>
        <p class="text-gray-600 text-left max-w-2xl mb-12">
            Que vous souhaitiez renforcer votre présence en ligne, bâtir une identité de marque forte ou captiver votre audience avec du contenu créatif, nous offrons des solutions complètes et adaptées.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-12 max-w-5xl mx-auto">
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
    </div>


    <br>
    <br>
    <br>
    <br>
    <br>
</body>
</html>
