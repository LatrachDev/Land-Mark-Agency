import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Blog from '../components/Blog';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import whiteLogo from '../assets/Logotype/White.png';

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
const formatBlogText = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');

  return lines.map((line, index) => {
    // Headings
    if (line.match(/^\d+\.\s+/)) {
      return <h2 key={index} className="text-xl font-bold mt-6 mb-2 text-[#263973]">{line}</h2>;
    }
    if (line.startsWith('#')) {
      return <h2 key={index} className="text-xl font-bold mt-6 mb-2 text-[#263973]">{line.replace(/^#+\s*/, '')}</h2>;
    }


    // Subpoints
    if (line.match(/^\d+\.\d+\s+/)) {
      return <h3 key={index} className="text-lg font-semibold mt-4 mb-1 text-[#445EF2]">{line}</h3>;
    }

    // List items start with -
    if (line.startsWith('-') || line.startsWith('*')) {
      return <li key={index} className="ml-6 list-disc">{line.slice(1).trim()}</li>;
    }

    // Regular paragraphs
    return <p key={index} className="text-base leading-relaxed mb-4">{line}</p>;
  });
};

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}api/blog/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        // console.log("Blog data:", data); 
        setBlog({
          ...data,
          image: `https://api.landmark.ma/public/storage/${data.image}`
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch blog data:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div className="text-center py-20 text-lg font-medium">Loading...</div>;
  if (!blog) return <div className="text-center py-20 text-lg font-medium">Blog post not found</div>;

  return (
    <>
    <div className="font-[Jost] bg-[#f9fafb] text-[#1f2937]">
      <Helmet>
        <title>{blog.title} | LandMark</title>
        <meta name="description" content={blog.description.substring(0, 160)} />
      </Helmet>

      <Promotion />
      <Nav />

      <main className="mx-auto w-[90%]  px-4 sm:px-6 mt-10">
        
        <div className="text-sm mb-5 text-gray-500">
          <time dateTime={blog.created_at}>
            Publié le {new Date(blog.created_at).toLocaleDateString()}
          </time>
          <span className="mx-2">•</span>
          <span>Par Landmark Team</span>
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-lg mb-10 shadow-lg object-cover hover:scale-[1.01] transition-transform duration-300 w-full md:h-96 sm:h-48 h-36"
        />
          
        <h1 style={{ fontFamily: 'bodoni' }} className="my-10 text-2xl sm:text-3xl md:text-5xl font-bold text-[#263973] leading-tight">
          {blog.title}
        </h1>


        {/* <p className="whitespace-pre-line">
          {blog.description}
        </p> */}

        <div className="prose max-w-none">
  {formatBlogText(blog.description)}
</div>


      </main>

    <Blog />
    </div>
    <Footer />
    </>
  );
}

export default BlogDetailPage;
