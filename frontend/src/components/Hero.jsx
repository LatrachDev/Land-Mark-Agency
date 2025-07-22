import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container px-4 sm:px-10 mx-auto mt-24 md:mt-40 w-[90%] m-auto">
      <div className="max-w-full">

        <div className="flex flex-col text-white justify-start items-start">
           
        <div className="mt-6 sm:mt-8 md:mt-10 mb-8">
          <p className="inline-block bg-gradient-to-r from-[#263973] to-[#445EF2] text-xs sm:text-xl font-bold uppercase tracking-wide text-white px-2 py-1">
            L’adoption ou l’adaptation au changement une décision qui vous ressemble
          </p>
        </div>


          <h1 className="text-['100px'] sm:text-2xl md:text-3xl font-jost font-bold sm:max-w-[80%] mb-4 md:mb-6 uppercase">
            grace a notre Expertise, notre 
            agence marketing est recommandée 
            par 92% de nos clients
          </h1>

        </div>

        <p className="text-gray-300 font-light mb-10 md:mb-20 text-sm sm:text-xl tracking-normal uppercase">
          Attirez plus de clients, boostez vos ventes et fidélisez vos clients.
        </p>

        <div className="flex flex-col text-center sm:flex-row gap-4 sm:gap-6 md:gap-8">
          <Link to="/contact" className="bg-[#445EF2] text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-sm sm:text-base md:text-lg">
            DEMANDEZ VOTRE DEVIS
          </Link>
          <Link to="/portfolio" className="border border-white text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-sm sm:text-base md:text-lg">
            VOIR LES PROJETS
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Hero;