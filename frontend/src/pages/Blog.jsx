import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Footer from '../components/Footer';

// Dummy blog data grouped by category
const blogCategories = [
  {
    category: 'EN RELATION AVEC LE MARKETING',
    posts: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Marketing Post ${i + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      image: './src/assets/JPG/projects/03-05.jpg',
    })),
  },
  {
    category: 'EN RELATION AVEC LE BRANDING',
    posts: Array.from({ length: 7 }, (_, i) => ({
      id: i + 10,
      title: `Branding Post ${i + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      image: './src/assets/JPG/projects/08-15.jpg',
    })),
  },
  {
    category: 'EN RELATION AVEC LA CRÉATION DE CONTENU',
    posts: Array.from({ length: 6 }, (_, i) => ({
      id: i + 20,
      title: `Contenu Post ${i + 1}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      image: './src/assets/JPG/projects/09-17.jpg',
    })),
  },
];

function BlogPage() {
  return (
    <div className="font-[Jost]">
      <Promotion />
      <Nav />

      <section className="mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%]">
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

      {/* Blog Sections */}
      <section className="px-4 sm:px-10 pb-16 bg-white">
        <div className="container w-[90%] mx-auto space-y-20">
          
          <div className="mb-12">
            <h2 className="text-xl text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
              Latest blog
            </h2>
          </div>

          {blogCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-xl text-[#263973] uppercase mb-6 text-left font-bold">
                {category.category}
              </h2>

              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                navigation
              >
                {category.posts.map((post) => (
                  <SwiperSlide key={post.id}>
                    <div className="flex flex-col bg-white">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto object-cover mb-4 rounded transition-transform duration-300 hover:scale-105"
                      />
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm">{post.description}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default BlogPage;
