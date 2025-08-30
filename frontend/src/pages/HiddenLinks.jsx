import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function HiddenLinks() {
  const links = [
    { title: "Hawkseo", url: "https://hawkseo.co/agence-seo-maroc", description: "SEO agency" },
    { title: "L3ochaq", url: "https://l3ochaq.ma/", description: "Store" },
  ];

  return (
    <div className="font-[Jost] flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1 bg-gray-50 py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Links
          </h1>
          <p className="text-gray-600 mb-10">
            Quick access to websites and resources
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  {link.title}
                </h2>
                <p className="text-gray-500 text-sm">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HiddenLinks;
