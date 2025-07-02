import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Promotion from '../components/Promotion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet";

function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDescription = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return lines.map((line, index) => {
      if (line.match(/^\d+\.\s+/)) {
        return <h2 key={index} className="text-xl font-bold mt-6 mb-2 text-[#263973]">{line}</h2>;
      }

      if (line.startsWith('#')) {
        return <h2 key={index} className="text-xl font-bold mt-6 mb-2 text-[#263973]">{line.replace(/^#+\s*/, '')}</h2>;
      }

      if (line.match(/^\d+\.\d+\s+/)) {
        return <h3 key={index} className="text-lg font-semibold mt-4 mb-1 text-[#445EF2]">{line}</h3>;
      }

      if (line.startsWith('-') || line.startsWith('*')) {
        return <li key={index} className="ml-6 list-disc">{line.slice(1).trim()}</li>;
      }

      return <p key={index} className="text-base leading-relaxed mb-4">{line}</p>;
    });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}api/services/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        setService({
          ...data,
          image: `https://api.landmark.ma/public/storage/${data.image}`,
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching service:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  // Enhanced Loading Component
  const LoadingComponent = () => (
    <div className="font-[Jost] bg-[#f9fafb] min-h-screen">
      <Promotion />
      <Nav />
      
      <main className="mx-auto w-[90%] px-4 sm:px-6 mt-10">
        {/* Breadcrumb Skeleton */}
        <div className="mb-5">
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>

        {/* Image Skeleton */}
        <div className="rounded-lg mb-10 shadow-lg w-full md:h-96 sm:h-48 h-36 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="my-10 space-y-3">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          
          <div className="pt-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </div>

          <div className="pt-6">
            <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>

        {/* Loading Spinner with Text */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#263973] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-[#263973] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-[#263973] font-medium animate-pulse">
            Chargement du service...
          </p>
          <div className="mt-2 flex space-x-1">
            <div className="w-2 h-2 bg-[#263973] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#263973] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#263973] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );

  // Enhanced Error Component
  const ErrorComponent = () => (
    <div className="font-[Jost] bg-[#f9fafb] min-h-screen">
      <Promotion />
      <Nav />
      
      <main className="mx-auto w-[90%] px-4 sm:px-6 mt-10">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service introuvable</h2>
          <p className="text-gray-600 text-center mb-8 max-w-md">
            Désolé, nous n'avons pas pu trouver le service que vous recherchez. 
            Il se peut qu'il ait été supprimé ou que l'URL soit incorrecte.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-[#263973] text-white rounded-lg hover:bg-[#1e2a5a] transition-colors duration-200"
            >
              Retour
            </button>
            <button 
              onClick={() => window.location.href = '/services'}
              className="px-6 py-3 border border-[#263973] text-[#263973] rounded-lg hover:bg-[#263973] hover:text-white transition-colors duration-200"
            >
              Voir tous les services
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );

  // Show loading state
  if (isLoading) return <LoadingComponent />;
  
  // Show error state
  if (error || !service) return <ErrorComponent />;

  return (
    <>
      <div className="font-[Jost] bg-[#f9fafb] text-[#1f2937]">
        <Helmet>
          <title>{service.title} | LandMark</title>
          <meta name="description" content={service.description?.substring(0, 160)} />
        </Helmet>

        <Promotion />
        <Nav />

        <main className="mx-auto w-[90%] px-4 sm:px-6 mt-10">
          <div className="text-sm mb-5 text-gray-500">
            <time dateTime={service.created_at}>
              Published on {new Date(service.created_at).toLocaleDateString()}
            </time>
            <span className="mx-2">•</span>
            <span>By Landmark Team</span>
          </div>

          <img
            src={service.image}
            alt={service.title}
            className="rounded-lg mb-10 shadow-lg object-cover hover:scale-[1.01] transition-transform duration-300 w-full md:h-96 sm:h-48 h-36"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-service.jpg';
              console.error('Failed to load service image');
            }}
          />

          <h1 style={{ fontFamily: 'bodoni' }} className="my-10 text-2xl sm:text-3xl md:text-5xl font-bold text-[#263973] leading-tight">
            {service.title}
          </h1>

          <div className="prose max-w-none">
            {formatDescription(service.description)}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default ServiceDetailPage;