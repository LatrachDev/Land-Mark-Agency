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
import Empty from '../components/Empty';
import bgImage from '../assets/BG/Asset7.png';

function Home() {


  return (
    <div className="font-[Jost]">

    <Helmet>
      <title>Home | LandMark</title>
      <meta name="description" content="Welcome to LandMark, a full-service marketing agency owned by Haytham Guemmah." />
    </Helmet>
    
    {/* <div className=""> */}
      <Promotion />
      <Nav />
      <div style={{ backgroundImage: `url(${bgImage})` }} className=" sm:-mt-25 -mt-22 w-full bg-cover bg-no-repeat">
      <Empty />

        <Hero />
        <Mission className='mx-auto py-16 px-4 sm:px-10 w-[90%] m-auto text-white' />
      </div>
      <Services />
      <Projects />
      <Content />
      <Reviews />
      <Contact />
      <Blog />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Home;
