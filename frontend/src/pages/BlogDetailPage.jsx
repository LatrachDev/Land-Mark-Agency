import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";
import whiteLogo from '../assets/Logotype/White.png';

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/blog/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        console.log("Blog data:", data); 
        setBlog({
          ...data,
          image: `http://127.0.0.1:8000/storage/${data.image}`
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

      <main className="mx-auto w-[90%] max-w-5xl px-4 sm:px-6 mt-20 md:mt-40">
        <article className="bg-white p-6 sm:p-10 rounded-xl shadow-md transition-all duration-300">
          <header className="mb-10">
            <span className="text-sm text-[#445EF2] uppercase font-semibold tracking-wide">
              {blog.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] mt-4 mb-4 leading-tight">
              {blog.title}
            </h1>

            <div className="text-sm text-gray-500">
              <time dateTime={blog.created_at}>
                Published on {new Date(blog.created_at).toLocaleDateString()}
              </time>
              <span className="mx-2">•</span>
              <span>By Landmark Team</span>
            </div>
          </header>

          <figure className="mb-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-lg object-cover shadow-lg hover:scale-[1.01] transition-transform duration-300"
            />
          </figure>

          <section className="prose prose-lg prose-blue max-w-none leading-relaxed">
            <p className="whitespace-pre-line">
              {blog.description}
            </p>
          </section>
        </article>
      </main>

    </div>
    <Footer />
    </>
  );
}

export default BlogDetailPage;
