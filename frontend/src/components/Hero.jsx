import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container px-4 sm:px-6 lg:px-10 mx-auto mt-16 sm:mt-24 lg:mt-40 w-[90%] m-auto">
      <div className="max-w-full">

       <div className="flex flex-col text-white justify-start items-start">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-jost font-bold uppercase mt-3 sm:mt-4 lg:mt-8 mb-3 sm:mb-4 lg:mb-6 leading-tight">
          Grace à notre expertise, notre agence marketing
          <br />
          <span className="inline-block bg-gradient-to-r from-[#263973] to-[#445EF2] px-1 sm:px-2 py-0.5 sm:py-1 mt-1 sm:mt-2">
            est recommandée par 92% de nos clients
          </span>
        </h1>
      </div>

        <p className="text-[#f2f2f2] font-light mb-6 sm:mb-8 lg:mb-10 text-xs sm:text-sm md:text-base lg:text-xl tracking-normal uppercase">
          Attirez plus de clients, boostez vos ventes et fidélisez vos clients.
        </p>

        <div className="flex flex-row justify-between items-start gap-2 sm:gap-4 lg:gap-8 mb-6 sm:mb-8 lg:mb-10 text-white w-full sm:w-10/12 lg:w-7/12">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: 'bodoni' }}>+750</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl leading-tight" style={{ fontFamily: 'DMSans' }}>Projets Réalisés</p>
          </div>

          <div className="bg-[#445EF2] w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 flex-shrink-0"></div>
          
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: 'bodoni' }}>+10</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl leading-tight" style={{ fontFamily: 'DMSans' }}>Clients Active</p>
          </div>
          
          <div className="bg-[#445EF2] w-0.5 sm:w-1 h-6 sm:h-8 lg:h-10 flex-shrink-0"></div>

          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" style={{ fontFamily: 'bodoni' }}>92%</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl leading-tight" style={{ fontFamily: 'DMSans' }}>De Clients Satisfaits</p>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-8">
          <Link to="/contact" className="bg-[#445EF2] text-white px-3 py-2 sm:px-4 sm:py-2 md:px-10 lg:py-3 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-xs text-center whitespace-nowrap">
            DEMANDEZ VOTRE DEVIS
          </Link>
          <Link to="/portfolio" className="border border-white text-white px-3 py-2 sm:px-4 sm:py-2 md:px-10 lg:py-3 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 text-xs text-center whitespace-nowrap">
            VOIR LES PROJETS
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Hero;