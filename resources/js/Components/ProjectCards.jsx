import React from "react";

export default function ProjectCard({ title, description, image, techStack, liveUrl, repoUrl }) {
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
            <span
              key={index}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-full"
            >
              {tech}
            </span>
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