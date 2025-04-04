<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Land Mark</title>
    <script src="js/tailwind.js"></script>
</head>
<body class="bg-[url(/../../LM/BG/Asset7.png)] w-full h-screen bg-cover">
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
        <div class="container mx-auto px-6 py-6">
            <div class="flex justify-between items-center space-x-22 font-bold ">
                <!-- Logo -->
                <a href="#" class="flex items-center mr-8">
                    <img src="LM/Logotype/White.png" alt="Landmark" class="h-14">
                </a>
                
                <div class="flex justify-between w-[40%]">
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
                </div>
                <button class="bg-transparent text-white text-sm px-4 py-1.5  border border-white transition-all duration-300  hover:border-blue-600">
                    CONSULTATION GRATUITE
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="container mx-auto px-6 mt-40">
        <div class="max-w-full mx-start">
            <div class="flex justify-start items-center">
                <h1 class="text-3xl md:text-4xl font-bold mb-6">
                <div class="w-full relative mb-2">
                    <div class="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-600 h-6 mt-10 w-[100%]"></div>
                    <div class="relative z-10 px-0 py-4">
                        <span class="text-white text-4xl font-bold uppercase tracking-wide text-center">
                        L'adoption ou l'adaptation au chagement
                        </span>
                    </div>
                    </div>
                    <div class="text-white leading-[1.4em] mb-12">UNE DÉCISION QUI VOUS RESSEMBLE</div>
                </h1>
            </div>
            <p class="text-gray-300 mb-20 text-xl tracking-normal">
                DÉVELOPPEZ LA NOTORIÉTÉ DE VOTRE MARQUE, AUGMENTEZ VOS VENTES<br>
                ET CRÉEZ UN LIEN FORT AVEC VOTRE AUDIENCE.
            </p>
            <div class="flex space-x-8">
                <button class="bg-blue-600 text-white px-6 py-3  transition-all duration-300 hover:bg-blue-700 hover:scale-105">
                    DEMANDEZ VOTRE FACTURE
                </button>
                <button class="border border-white text-white px-6 py-3  transition-all duration-300 hover:bg-white hover:text-black hover:scale-105">
                    VOIR LE PORTFOLIO
                </button>
            </div>
        </div>
    </div>

    <div class="container mx-auto max:px-0 mt-32 mb-38">
        <h2 class="text-white text-xl tracking-[0.2em] font-['BioRhyme_Expanded'] mb-6 uppercase pl-0">Notre Mission</h2>
        <div class="relative w-full aspect-video  overflow-hidden">
            <img 
                src="LM/JPG/me video.png" 
                alt="Notre Mission" 
                class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 flex items-center justify-center">
                <button class="w-16 h-16 rounded-full flex items-center justify-center hover:bg-black/40 transition-all">
                    <img src="LM/Services/videoIcon2.svg" alt="" class="w-12 h-12 rounded-full flex items-center justify-center">
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