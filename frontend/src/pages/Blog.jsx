import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
// import Blog from '../components/Blog';

function Blog() {
  return (
    <div className="font-[Jost]">

      <Promotion />
      <Nav />

      <section className="mx-auto px-6 mt-20 md:mt-40 w-[90%] m-auto">
        <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
          <span className="text-[#445ef2]">93%</span> de nos clients se disent <br />
          pleinement satisfaits et prêts à <br />
          recommander nos services
        </h1>
        <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
          Faites comme eux, choisissez l’excellence et rejoignez une communauté <br />
          qui nous fait confiance pour transformer leurs ambitions en réussites.
        </p>
      </section>
      <section className="mx-auto px-6 mt-20 md:mt-40 w-[90%] m-auto">
        <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
          <span className="text-[#445ef2]">93%</span> de nos clients se disent <br />
          pleinement satisfaits et prêts à <br />
          recommander nos services
        </h1>
        <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
          Faites comme eux, choisissez l’excellence et rejoignez une communauté <br />
          qui nous fait confiance pour transformer leurs ambitions en réussites.
        </p>
      </section>
    </div>
  );
}

export default Blog;
