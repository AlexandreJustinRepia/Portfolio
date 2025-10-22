import React from "react";

export default function ContactCard({ title, icon, link, details }) {
  return (
    <div
      className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* --- Card Content --- */}
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm sm:text-base mb-4">{details}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 text-red-400 font-semibold rounded-md border border-red-400 hover:bg-red-400 hover:text-white transition"
        >
          Connect
        </a>
      </div>
    </div>
  );
}