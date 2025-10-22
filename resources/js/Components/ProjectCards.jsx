import React from "react";
import {
  SiLaravel,
  SiVuedotjs,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiPhp,
  SiHtml5,
  SiApache,
  SiMariadb,
  SiSqlite,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiMongodb,
} from "react-icons/si";

export default function ProjectCard({ title, description, image, techStack, liveUrl, repoUrl }) {
  // Map tech stack to icons and colors
  const techIcons = {
    Laravel: { icon: <SiLaravel size={20} color="#ff2d2d" />, color: "#ff2d2d" },
    Vue: { icon: <SiVuedotjs size={20} color="#42b883" />, color: "#42b883" },
    React: { icon: <SiReact size={20} color="#61dafb" />, color: "#61dafb" },
    "Tailwind CSS": { icon: <SiTailwindcss size={20} color="#38bdf8" />, color: "#38bdf8" },
    MySQL: { icon: <SiMysql size={20} color="#4479a1" />, color: "#4479a1" },
    PHP: { icon: <SiPhp size={20} color="#787cb5" />, color: "#787cb5" },
    HTML5: { icon: <SiHtml5 size={20} color="#e34f26" />, color: "#e34f26" },
    Apache: { icon: <SiApache size={20} color="#d22128" />, color: "#d22128" },
    MariaDB: { icon: <SiMariadb size={20} color="#003545" />, color: "#003545" },
    SQLite: { icon: <SiSqlite size={20} color="#003b57" />, color: "#003b57" },
    Git: { icon: <SiGit size={20} color="#f34f29" />, color: "#f34f29" },
    GitHub: { icon: <SiGithub size={20} color="#ffffff" />, color: "#ffffff" },
    "Node.js": { icon: <SiNodedotjs size={20} color="#8cc84b" />, color: "#8cc84b" },
    MongoDB: { icon: <SiMongodb size={20} color="#47a248" />, color: "#47a248" },
  };

  return (
    <div
      className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* --- Project Image --- */}
      <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={image || "images/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- Project Content --- */}
      <div className="p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-full"
            >
              {techIcons[tech]?.icon || null}
              <span className="ml-2">{tech}</span>
            </div>
          ))}
        </div>

        {/* --- Links --- */}
        <div className="flex gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 font-semibold px-4 py-2 rounded-md border border-red-400 hover:bg-red-400 hover:text-white transition"
            >
              Live Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 font-semibold px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-300 hover:text-black transition"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}