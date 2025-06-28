import React from 'react';
import azzimaniImage from '../assets/reviews/azzimani.jpg';
import logoForProfilesImage from '../assets/reviews/logo-for-profiles.png';
import minariProfileImage from '../assets/reviews/MINARI-prophile-12.png';
import googleLogoImage from '../assets/reviews/google-logo.png';

const reviews = [
  {
    quote:
      ' Une agence qui comprend vite, travaille bien et livre mieux que ce qu'on imaginait. Très satisfait du résultat final. ',
    clientName: 'Mohammed Azzimani',
    company: 'Al Andalous Pack',
    avatar: azzimaniImage,
    platformLogo: googleLogoImage,
  },
  {
    quote:
      ' On a attendu un peu plus que prévu parce que l'équipe voulait vraiment bien faire les choses. Et honnêtement, le résultat final est super. ',
    clientName: 'Khaoula Touijer',
    company: 'Growmax',
    avatar: logoForProfilesImage,
    platformLogo: googleLogoImage,
  },
  {
    quote:
      ' Tout simplement had l'agence homa les meilleurs avec qui j'ai travaillé. machaellah wahed la créativité 3endhom WOW. ',
    clientName: 'Amina Bitari',
    company: 'Minari',
    avatar: minariProfileImage,
    platformLogo: googleLogoImage,
  },
];

const QuoteIcon = () => (
  <svg
    width="32"
    height="28"
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-indigo-900"
  >
    <path
      d="M18.504 13.768V0.807997H31.368V4.168C31.368 9.416 30.952 13.352 30.12 15.976C29.352 18.536 27.24 22.216 23.784 27.016L18.312 23.944C21.192 19.016 22.856 15.624 23.304 13.768H18.504ZM1.032 13.768V0.807997H13.896V4.168C13.896 9.416 13.48 13.352 12.648 15.976C11.88 18.536 9.768 22.216 6.312 27.016L0.84 23.944C3.72 19.016 5.384 15.624 5.832 13.768H1.032Z"
      fill="#263973"
    />
  </svg>
);

const Reviews = () => {
  return (
    <section className="bg-white mx-auto px-4 sm:px-10 py-16">
      <div className="container w-[90%] m-auto">
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-[#263973] uppercase text-left" style={{ fontFamily: 'bodoni' }}>
            NOS MEILLEURES AVIS CLIENTS
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-8 rounded-lg">
              <div className="text-6xl text-indigo-900 font-serif mb-4">
                <QuoteIcon />
              </div>
              <p className="font-['Jost'] text-gray-800 mb-8">
                “{review.quote}”
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={review.avatar}
                    alt={review.clientName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="font-['Jost'] font-bold">{review.company}</h4>
                    <p className="font-['Jost'] text-sm text-gray-600">
                      {review.clientName}
                    </p>
                  </div>
                </div>
                <img
                  src={review.platformLogo}
                  alt="Platform Logo"
                  className="h-6"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
