import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const blogPosts = [
  {
    id: 1,
    title: 'PROJECT NAME',
    image: 'src/assets/JPG/haytham.jpg',
    description: 'Project brief and all aspects of this projects in short words to help understand what we worked on while the project.'
  },
  {
    id: 2,
    title: 'PROJECT NAME',
    image: 'src/assets/JPG/haytham.jpg',
    description: 'Project brief and all aspects of this projects in short words to help understand what we worked on while the project.'
  },
  {
    id: 3,
    title: 'PROJECT NAME',
    image: 'src/assets/JPG/haytham.jpg',
    description: 'Project brief and all aspects of this projects in short words to help understand what we worked on while the project.'
  },
  {
    id: 4,
    title: 'PROJECT NAME',
    image: 'src/assets/JPG/haytham.jpg',
    description: 'Project brief and all aspects of this projects in short words to help understand what we worked on while the project.'
  },
  {
    id: 5,
    title: 'PROJECT NAME',
    image: 'src/assets/JPG/haytham.jpg',
    description: 'Project brief and all aspects of this projects in short words to help understand what we worked on while the project.'
  },
  {
    id: 6,
    title: 'PROJECT NAME',
    image: 'src/assets/JPG/haytham.jpg',
    description: 'Project brief and all aspects of this projects in short words to help understand what we worked on while the project.'
  },
  {
    id: 7,
    title: 'PROJECT NAME',
    image: 'src/assets/JPG/haytham.jpg',
    description: 'Project brief and all aspects of this projects in short words to help understand what we worked on while the project.'
  }
];

const Blog = () => {
  return (
    <section className="px-4 sm:px-10 py-16 bg-white">
      <div className="container w-[90%] m-auto">
        <div className="mb-12">
          <h2 className="text-sm sm:text-xl text-[#263973] uppercase text-left" style={{ fontFamily: 'BioRhyme_Expanded' }}>
            Latest blog
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
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id} className="flex flex-col">
              <div className="mb-8 overflow-hidden">
                <img
                  src={post.image}
                  alt="Blog Visual"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-sm sm:text-xl font-bold font-['Jost'] mb-4">{post.title}</h3>
              <p className="font-['Jost'] text-sm sm:text-xl mb-4">{post.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-left">
          <a href="/blog" className="inline-block mt-5 border-2 border-gray-800 px-8 py-3 font-['Jost'] uppercase hover:bg-gray-800 hover:text-white transition-colors">
            read more
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;
