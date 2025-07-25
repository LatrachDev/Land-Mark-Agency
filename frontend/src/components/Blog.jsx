import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}api/home`, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setBlogs(data.blogs || []);
        // console.log('data.blogs', data.blogs);
      })
      .catch(error => {
        console.error('Failed to fetch blogs:', error);
      });
  }, []);

  const baseURL = 'https://api.landmark.ma/public/storage/';

  // Truncate description to a preview
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <section className="px-4 sm:px-10 py-16">
      <div className="container w-[90%] m-auto">
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#263973] uppercase text-left" style={{ fontFamily: 'bodoni' }}>
            Dernier Blog
          </h2>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {blogs.map((post) => (
            <SwiperSlide key={post.id} className="flex flex-col">
              
              <Link to={`/blog/${post.id}`} >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={baseURL + post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded transition-transform duration-500 hover:scale-105"
                  />
                </div>
              <h3 className="text-sm sm:text-xl font-bold font-['Jost'] mb-2">{post.title}</h3>
              <p className="font-['Jost'] text-sm sm:text-base mb-2 text-gray-600">
                {truncateText(post.description, 100)}
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="text-[#445EF2] text-sm font-medium hover:underline"
                >
                Lire la suite
              </Link>
            </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-left">
          <Link
            to="/blog"
            className="inline-block mt-5 border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors"
          >
            Lire la suite
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
