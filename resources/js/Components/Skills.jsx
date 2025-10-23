import React, { useState } from "react";
import LogoLoop from "./LogoLoop";
import {
  SiLaravel,
  SiVuedotjs,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiMariadb,
  SiSqlite,
  SiGit,
  SiGithub,
  SiApache,
  SiNodedotjs,
  SiPhp,
  SiHtml5,
} from "react-icons/si";

export default function Skills() {
  const [showSkills, setShowSkills] = useState(false);

  const logoSize = 90;
  const techLogos = [
    { node: <SiLaravel size={logoSize} color="#ff2d2d" />, title: "Laravel", href: "https://laravel.com" },
    { node: <SiVuedotjs size={logoSize} color="#42b883" />, title: "Vue.js", href: "https://vuejs.org" },
    { node: <SiReact size={logoSize} color="#61dafb" />, title: "React", href: "https://react.dev" },
    { node: <SiTailwindcss size={logoSize} color="#38bdf8" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiPhp size={logoSize} color="#787cb5" />, title: "PHP", href: "https://www.php.net" },
    { node: <SiHtml5 size={logoSize} color="#e34f26" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { node: <SiApache size={logoSize} color="#d22128" />, title: "Apache", href: "https://httpd.apache.org" },
    { node: <SiMysql size={logoSize} color="#4479a1" />, title: "MySQL", href: "https://www.mysql.com" },
    { node: <SiMariadb size={logoSize} color="#003545" />, title: "MariaDB", href: "https://mariadb.org" },
    { node: <SiSqlite size={logoSize} color="#003b57" />, title: "SQLite", href: "https://www.sqlite.org" },
    { node: <SiGit size={logoSize} color="#f34f29" />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub size={logoSize} color="#ffffff" />, title: "GitHub", href: "https://github.com" },
    { node: <SiNodedotjs size={logoSize} color="#8cc84b" />, title: "Node.js", href: "https://nodejs.org" },
  ];

  const skills = [
    {
      title: "Full-stack web development with Laravel and Vue/React",
      icon: <SiLaravel size={48} color="#ff2d2d" />,
      proficiency: 95,
    },
    {
      title: "Responsive design using Tailwind CSS",
      icon: <SiTailwindcss size={48} color="#38bdf8" />,
      proficiency: 90,
    },
    {
      title: "Database management (MySQL, MariaDB, SQLite)",
      icon: <SiMysql size={48} color="#4479a1" />,
      proficiency: 85,
    },
    {
      title: "Version control using Git and GitHub",
      icon: <SiGit size={48} color="#f34f29" />,
      proficiency: 90,
    },
    {
      title: "API integration and RESTful design",
      icon: <SiNodedotjs size={48} color="#8cc84b" />,
      proficiency: 85,
    },
    {
      title: "Backend server setup using Apache and Node.js",
      icon: <SiApache size={48} color="#d22128" />,
      proficiency: 85,
    },
    {
      title: "Deployment and hosting experience",
      icon: <SiGithub size={48} color="#ffffff" />,
      proficiency: 80,
    },
  ];

  return (
    <section
      id="skills"
      className="bg-black text-white py-16 px-6 md:px-20 min-h-screen scroll-mt-24 overflow-hidden"
      data-aos="fade-right"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* --- Header --- */}
        <div className="w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">
            My Professional Skills
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            A comprehensive showcase of my technical expertise and tools I master
          </p>
        </div>

        {/* --- Tech Logos Carousel --- */}
        <div className="w-full mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="relative h-32 md:h-40 overflow-hidden rounded-xl shadow-2xl border border-red-500/30 flex items-center justify-center">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={64}
              gap={32}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#000000"
              ariaLabel="My Tech Stack"
            />
          </div>
        </div>

        {/* --- Button --- */}
        <button
          onClick={() => setShowSkills(!showSkills)}
          className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {showSkills ? "Hide Skills" : "View Detailed Skills"}
        </button>

        {/* --- Skills Grid --- */}
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-in-out ${
            showSkills ? "opacity-100 max-h-full mt-8" : "opacity-0 max-h-0"
          }`}
        >
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-red-500/20 hover:border-red-500/50 border border-gray-700 transition-all duration-300 transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay={100 * index}
            >
              <div className="flex justify-center mb-4">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{skill.title}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm">Proficiency: {skill.proficiency}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}