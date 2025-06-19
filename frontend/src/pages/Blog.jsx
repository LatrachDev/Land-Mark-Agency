import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';

function BlogPage() {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/home', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data.blogs) {
          // Group blogs by category
          const groupedBlogs = data.blogs.reduce((acc, blog) => {
            const category = blog.category;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push({
              ...blog,
              image: `http://127.0.0.1:8000/storage/${blog.image}`
            });
            return acc;
          }, {});

          // Convert to array format matching your original structure
          const formattedData = Object.entries(groupedBlogs).map(([category, posts]) => ({
            category: `EN RELATION AVEC LE ${category}`,
            posts: posts
          }));

          setBlogData(formattedData);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch blog data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="font-[Jost]">
      <Helmet>
        <title>Blog | LandMark</title>
        <meta name="description" content="Read our latest insights on branding, marketing, web development, and digital trends from LandMark." />
      </Helmet>
      
      <Promotion />
      <Nav />

      <section className="mx-auto px-4 sm:px-10 mt-20 md:mt-40 w-[90%]">
        <h1 className="text-[#010e26] text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide mb-4 md:mb-6">
          <span className="text-[#445ef2]">93%</span> de nos clients se disent <br />
          pleinement satisfaits et prêts à <br />
          recommander nos services
        </h1>
        <p className="text-[#010e26] uppercase mb-10 md:mb-20 text-base sm:text-lg md:text-xl tracking-normal">
          Faites comme eux, choisissez l'excellence et rejoignez une communauté <br />
          qui nous fait confiance pour transformer leurs ambitions en réussites.
        </p>
      </section>

      {/* Blog Sections */}
      <section className="px-4 sm:px-10 pb-16 bg-white">
        <div className="container w-[90%] mx-auto space-y-20">
          
          <div className="mb-12">
            <h2 className="text-sm sm:text-xl text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
              Latest blog
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-10">Loading blog posts...</div>
          ) : blogData.length > 0 ? (
            blogData.map((category, index) => (
              <div key={index}>
                <h2 className="text-sm sm:text-xl text-[#263973] uppercase mb-6 text-left font-bold">
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
                      <div className="flex flex-col bg-white h-full">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover mb-4 rounded transition-transform duration-300 hover:scale-105"
                        />
                        <h3 className="text-xl sm:text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm flex-grow">{post.description}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))
          ) : (
            <div className="text-center py-10">No blog posts available</div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default BlogPage;