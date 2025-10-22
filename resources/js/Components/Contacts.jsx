import React, { useState } from "react";

export default function Contacts() {

  return (
    <section
      id="contact"
      className="bg-black text-white py-16 px-6 md:px-20 min-h-screen scroll-mt-24 overflow-hidden"
      data-aos="fade-left"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* --- Header --- */}
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block group">
            Contacts
            <span
              className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[3px] w-16 bg-red-500 rounded
              transition-all duration-500 ease-in-out group-hover:w-32"
            ></span>
          </h2>
          <h1 className="text-3xl sm:text-4xl">
            Coming Soon!
          </h1>
        </div>
      </div>
    </section>
  );
}
