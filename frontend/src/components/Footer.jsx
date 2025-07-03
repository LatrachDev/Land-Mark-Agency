import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { FacebookFilled, BehanceOutlined, LinkedinFilled, InstagramOutlined }from "@ant-design/icons" ;
import { Link } from 'react-router-dom';
import whiteLogo from '../assets/Logotype/White.png';
import bgFooter from '../assets/BG/Web-Site-BG-black.jpg';

const Footer = () => {
  return (
    <footer  style={{ backgroundImage: `url(${bgFooter})` }} className=" bg-cover bg-center w-full text-white font-['Jost'] pt-12 md:pt-20 pb-6 md:pb-10 px-4 sm:px-10 z-30">
      <div className=" mx-auto flex flex-col w-[90%]">
        {/* Logo */}
        <img className="w-48 md:w-64 mb-12 md:mb-20" src={whiteLogo} alt="Landmark logo"/>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Left Section */}
          <div className="lg:w-7/12">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase mb-4 md:mb-6 tracking-wide text-left">
              Prêt à commencer ?
            </h2>
            <p className="text-sm md:text-lg text-left lg:text-justify w-full lg:w-10/12 mb-6 md:mb-8 tracking-wider uppercase font-light">
              Grâce à une enquête de satisfaction client, 92 % de nos clients expriment une grande satisfaction et recommandent en toute confiance nos services à d’autres.
            </p>
            <div className="text-left">
              <Link to="/contact" className="inline-block border border-white text-white px-8 py-3 md:px-10 md:py-4 uppercase font-normal text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
                Contactez-nous
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-5/12 flex flex-col md:flex-row lg:flex-col gap-8 md:gap-12">
            {/* Social Media */}
            <div className="w-full md:w-1/2 lg:w-full">
              <p className="uppercase font-bold mb-3 text-sm tracking-wider text-left" style={{ fontFamily: 'bodoni' }}>
                suivez-nous pour du contenu quotidien
              </p>
              <div className="flex md:justify-start space-x-6 text-xl mt-6 md:mt-10">
                <a
                  href="https://www.facebook.com/landmarkagency.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookFilled className="hover:opacity-70 transition-opacity cursor-pointer" />
                </a>
                <a
                  href="https://www.instagram.com/landmark_agency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramOutlined className="hover:opacity-70 transition-opacity cursor-pointer" />
                </a>
                <a
                  href="https://www.linkedin.com/company/landmarkagency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinFilled className="hover:opacity-70 transition-opacity cursor-pointer" />
                </a>
                <a
                  href="https://www.behance.net/landmarkagency"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                >
                  <BehanceOutlined className="hover:opacity-70 transition-opacity cursor-pointer" />
                  {/* <BehanceSquareFilled className="hover:opacity-70 transition-opacity cursor-pointer" /> */}
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="w-full md:w-1/2 lg:w-full">
              <p className="uppercase mb-3 font-bold text-sm tracking-wider text-left" style={{ fontFamily: 'bodoni' }}>
                NAVIGATION
              </p>
              <ul className="space-y-2 mt-6 md:mt-10 text-left">
                  <li> <Link to="/portfolio" className="font-semibold text-sm border-b-2 border-transparent hover:opacity-70 hover:border-[#445ef2] transition-opacity block w-fit" > PROJET </Link> </li>
                  <li> <Link to="/services" className="font-semibold text-sm border-b-2 border-transparent hover:opacity-70 hover:border-[#445ef2] transition-opacity block w-fit" > SERVICES </Link> </li>
                  <li> <Link to="/about" className="font-semibold text-sm border-b-2 border-transparent hover:opacity-70 hover:border-[#445ef2] transition-opacity block w-fit uppercase" > à propos de nous </Link> </li>
                  <li> <Link to="/contact" className="font-semibold text-sm border-b-2 border-transparent hover:opacity-70 hover:border-[#445ef2] transition-opacity block w-fit uppercase" > Contactez-nous </Link> </li>
                  <li> <Link to="/blog" className="font-semibold text-sm border-b-2 border-transparent hover:opacity-70 hover:border-[#445ef2] transition-opacity block w-fit" > BLOG </Link> </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 text-sm md:text-base lg:text-xl">
          Copyright © 2025 tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;
