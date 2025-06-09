import Promotion from './components/Promotion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Services from './components/Services';
import Projects from './components/Projects';
import Content from './components/Content';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <div className="font-[Jost]">
      {/* <Promotion /> */}
      <div className="bg-[url('../assets/BG/Asset7.png')] w-full bg-cover bg-no-repeat">
        <Nav />
        {/* <Hero />
        <Mission /> */}
      </div>
      {/* <Services />
      <Projects />
      <Content />
      <Reviews />
      <Contact />
      <Blog />
      <FAQ />
      <Footer /> */}
    </div>
  );
}

export default App;
