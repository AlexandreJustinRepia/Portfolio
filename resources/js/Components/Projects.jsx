import React from "react";
import ProjectCard from "./ProjectCards";

export default function Projects() {
  // Sample project data (replace with your actual projects)
  const projects = [
    {
      title: "PawsnClaws",
      description:
        "A full-stack community platform for pet adoption and stray animal management.",
      image: "images/thumbnails/pnc.png",
      techStack: ["Laravel", "Vue", "Tailwind CSS", "MySQL"],
      repoUrl: "https://github.com/AlexandreJustinRepia/PNC",
      visibility: "Public",
      status: "Completed",
    },
    {
      title: "DENR - Document Tracking System",
      description:
        "A web-based document tracking system that streamlines the routing, monitoring, and management of official documents across multiple offices in real time.",
      image: "images/thumbnails/dts.png",
      techStack: ["Laravel", "Vue", "Tailwind CSS", "MySQL", "Inertia.js"],
      repoUrl: "https://github.com/AlexandreJustinRepia/DTS-DENR",
      visibility: "Private",
      status: "Ongoing",
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio showcasing my projects, skills, and contact information with a modern, responsive design.",
      image: "images/thumbnails/aj.png",
      techStack: ["Laravel", "React", "Tailwind CSS", "Inertia.js", "MySQL"],
      repoUrl: "https://github.com/AlexandreJustinRepia/Portfolio",
      visibility: "Public",
      status: "Ongoing",
    },
    {
      title: "ZKTeco-Extractor",
      description: "A PHP tool that converts ZKTeco log files into a formatted Daily Time Record (DTR) with auto time classification and one-click copy to clipboard."
    }
  ];

  return (
    <section
      id="projects"
      className="bg-black text-white py-16 px-6 md:px-20 min-h-screen scroll-mt-24 overflow-hidden"
      data-aos="fade-right"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* --- Header --- */}
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block group">
            Projects
            <span
              className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[3px] w-16 bg-red-500 rounded
              transition-all duration-500 ease-in-out group-hover:w-32"
            ></span>
          </h2>
        </div>

        {/* --- Project Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              techStack={project.techStack}
              liveUrl={project.liveUrl}
              repoUrl={project.repoUrl}
              visibility={project.visibility}
              status={project.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
