import React from "react";

export default function AboutMe() {
  return (
    <section id="about" className="bg-black text-white py-16 px-6 md:px-20 min-h-screen scroll-mt-24" data-aos="fade-right">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* --- Left: Image --- */}
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                <img
                src="images/me.jpg"
                alt="Alexandre Justin Repia"
                className="rounded-2xl shadow-lg w-56 sm:w-64 md:w-72 lg:w-80 object-cover"
                />
            </div>

            {/* --- Right: Text --- */}
            <div className="w-full md:w-2/3 text-center md:text-left">
                <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold mb-10 inline-block">
                    About Me
                    <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[3px] w-16 bg-red-500 rounded"></span>
                </h2>

                <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                    I’m <span className="text-white font-semibold">Alexandre Justin Repia</span> — 
                    a back-end developer with a strong focus on Laravel and database design.
                </p>

                <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                    I’m currently improving my front-end and UI design skills using Vue and React
                    to create complete, full-stack web experiences.
                </p>

                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    I’m passionate about building efficient systems, learning new frameworks,
                    and contributing to meaningful projects that make an impact.
                </p>
            </div>
        </div>
    </section>
  );
}
