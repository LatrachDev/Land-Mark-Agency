const Hero = () => {
  return (
    <div className="container px-4 sm:px-10 mx-auto mt-20 md:mt-40 w-[90%] m-auto">
      <div className="max-w-full">
        <div className="flex justify-start items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-jost font-bold mb-4 md:mb-6">
            <div className="w-full relative mb-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-600 h-4 sm:h-5 md:h-6 mt-6 sm:mt-8 md:mt-10 w-full"></div>
              <div className="relative z-10 px-0 py-2 sm:py-3 md:py-4">
                <span className="text-white text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide">
                  L'adoption ou l'adaptation au changement
                </span>
              </div>
            </div>
            <div className="text-white leading-[1.4em] text-lg sm:text-xl md:text-2xl mb-8 md:mb-12">
              UNE DÉCISION QUI VOUS RESSEMBLE
            </div>
          </h1>
        </div>

        <p className="text-gray-300 mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
          DÉVELOPPEZ LA NOTORIÉTÉ DE VOTRE MARQUE,<br className="sm:hidden" />
          AUGMENTEZ VOS VENTES<br className="hidden sm:block md:hidden" />
          ET CRÉEZ UN LIEN FORT AVEC VOTRE AUDIENCE.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          <a href="/contact" className="bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:bg-blue-700 hover:scale-105 text-sm sm:text-base md:text-lg">
            DEMANDEZ VOTRE FACTURE
          </a>
          <button className="border border-white text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-sm sm:text-base md:text-lg">
            VOIR LE PORTFOLIO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;