import React, { useState } from "react";
import Logo from "@/Components/Logo";

export default function Skills() {
  const [showSkills, setShowSkills] = useState(false);

  return (
    <section
      id="skills"
      className="bg-black text-white py-16 px-6 md:px-20 min-h-screen scroll-mt-24"
      data-aos="fade-left"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* --- Header --- */}
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block group">
            Skills
            <span
              className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[3px] w-16 bg-red-500 rounded
              transition-all duration-500 ease-in-out group-hover:w-32"
            ></span>
          </h2>
        </div>

        {/* --- Tech Logos --- */}
        <div>
          <Logo />
        </div>

        {/* --- Button --- */}
        <button
          onClick={() => setShowSkills(!showSkills)}
          className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-lg font-semibold shadow-md hover:shadow-lg"
        >
          {showSkills ? "Hide Skills" : "View Skills"}
        </button>

        {/* --- Bullet List --- */}
        <div
          className={`transition-all duration-700 overflow-hidden ${
            showSkills ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="list-disc list-inside text-left space-y-2 text-lg mt-4">
            <li>Full-stack web development with Laravel and Vue/React</li>
            <li>Responsive design using Tailwind CSS</li>
            <li>Database management (MySQL, MariaDB, SQLite)</li>
            <li>Version control using Git and GitHub</li>
            <li>API integration and RESTful design</li>
            <li>Backend server setup using Apache and Node.js</li>
            <li>Deployment and hosting experience</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
