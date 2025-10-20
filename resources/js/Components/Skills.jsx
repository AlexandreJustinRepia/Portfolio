import React from "react";
import Logo from "@/Components/Logo";

export default function Skills() {
  return (
    <section id="skills" className="bg-black text-white py-16 px-6 md:px-20 min-h-screen scroll-mt-24" data-aos="fade-left">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* --- Centered Text --- */}
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            Skills
            <span className="block h-[3px] w-16 bg-red-500 mt-2 mx-auto rounded"></span>
          </h2>
        </div>
        <div>
            <Logo/>
        </div>
      </div>
    </section>
  );
}
