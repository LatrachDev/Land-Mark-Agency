import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Content from '../components/Content';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";

function ContactPage() {
  return (
    <div className="font-[Jost]">

        <Helmet>
            <title>Home | LandMark</title>
            <meta name="description" content="Welcome to LandMark, a full-service marketing agency owned by Haytham Guemmah." />
        </Helmet>

    <section className="px-4 sm:px-10 py-8 bg-[#eeeeee]">
      <div className="container w-[90%] m-auto">
        <div className="mb-12">
          <h2 className="text-xl font-['BioRhyme_Expanded'] text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
            Contact us
          </h2>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Form Section */}
          <div className="w-full lg:w-8/12">
            <h3 className="text-xl font-bold text-left text-[#010E26] uppercase mb-4">
              fill out the form, and we'll contact you.
            </h3>

            <div className="lg:w-7/12">
              <form
                id="contactForm"
                action="https://formspree.io/f/xwplbdpq"
                method="POST"
                className="space-y-4"
              >
                {/* Interests */}
                <div className="mb-6">
                  <h4 className="font-medium text-[#010E26] mb-2">
                    I AM INTERESTED IN:
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["BRANDING", "WEBSITE DESIGN", "CONTENT CREATION", "PACKAGING", "OTHER"].map(
                      (item) => (
                        <label key={item} className="relative">
                          <input
                            type="checkbox"
                            name="interest[]"
                            value={item}
                            className="absolute opacity-0 w-full h-full cursor-pointer peer"
                          />
                          <span className="inline-block border-2 border-black px-4 py-1 text-sm peer-checked:bg-black peer-checked:text-white">
                            {item}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div>
                  <input
                    name="name"
                    placeholder="Full Name"
                    type="text"
                    className="w-full p-2 border-b-2 border-gray-400 bg-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="w-full p-2 border-b-2 border-gray-400 bg-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full p-2 border-b-2 border-gray-400 bg-transparent"
                  />
                </div>
                <div>
                  <input
                    name="company"
                    placeholder="Company Name"
                    type="text"
                    className="w-full p-2 border-b-2 border-gray-400 bg-transparent"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your business"
                    className="w-full p-2 border-b-2 border-gray-400 bg-transparent h-24"
                    required
                  ></textarea>
                </div>

                <p id="form-status" className="text-green-500 text-sm hidden"></p>

                <button
                  type="submit"
                  className="bg-[#010E26] text-white px-8 py-3 uppercase font-medium hover:bg-gray-700 transition-colors"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>

          {/* Image & Info Section */}
          <div className="lg:w-4/12">
            <div className="mb-6">
              <img src="src/assets/JPG/haytham.jpg" alt="Haytham" className="w-full h-auto" />
            </div>
            <p className="italic text-justify text-xl text-[#666666] mb-4">
              Did you know that 4 out of 5 customers switch brands due to poor customer experience
              and design? <br />
              At Landmark, we specialize in crafting innovative and trendy visuals that not only
              captivate but also make your products and projects unforgettable.
            </p>
            <h4 className="font-bold text-xl uppercase">HAYTHAM GUERMAH</h4>
            <p className="font-medium italic text-xs">FOUNDER & CEO OF @LANDMARK</p>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}

export default ContactPage;
