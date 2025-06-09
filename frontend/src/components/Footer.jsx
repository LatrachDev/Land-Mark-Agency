import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[url('/LM/BG/footer.jpg')] bg-cover bg-center w-full text-white font-['Jost'] pt-12 md:pt-20 pb-6 md:pb-10 px-4 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <img
          className="w-48 md:w-64 mb-12 md:mb-20"
          src="/LM/Logotype/White.png"
          alt="Landmark logo"
        />

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Left Section */}
          <div className="lg:w-7/12">
            <h2 className="text-xl sm:text-4xl font-bold uppercase mb-4 md:mb-6 tracking-wide text-left">
              READY TO GET STARTED?
            </h2>
            <p className="text-base md:text-lg text-left lg:text-justify w-full lg:w-10/12 mb-6 md:mb-8 tracking-wider uppercase font-light">
              Through a customer satisfaction survey. 96% of our clients express strong satisfaction and would confidently recommend our services to others.
            </p>
            <div className="text-left">
              <a
                href="#"
                className="inline-block border border-white text-white px-8 py-3 md:px-10 md:py-4 uppercase font-normal text-sm tracking-wider hover:bg-white hover:text-black transition-colors"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-5/12 flex flex-col md:flex-row lg:flex-col gap-8 md:gap-12">
            {/* Social Media */}
            <div className="w-full md:w-1/2 lg:w-full">
              <p className="uppercase mb-3 text-sm tracking-wider font-['BioRhyme_Expanded'] text-left">
                FOLLOW US FOR DAILY CONTENT
              </p>
              <div className="flex md:justify-start space-x-6 text-xl mt-6 md:mt-10">
                <a
                  href="#"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Behance"
                >
                  <i className="fa-brands fa-behance"></i>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="w-full md:w-1/2 lg:w-full">
              <p className="font-bold uppercase mb-3 text-sm tracking-wider font-['BioRhyme_Expanded'] text-left">
                NAVIGATION
              </p>
              <ul className="space-y-2 mt-6 md:mt-10 text-left">
                {['WORK', 'SERVICES', 'ABOUT US', 'CONTACT US', 'BLOG'].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="font-bold text-sm hover:opacity-70 hover:border-b-2 hover:border-[#445ef2] transition-opacity block w-fit"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 text-sm md:text-base lg:text-xl">
          Copyright © 2025 all rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
