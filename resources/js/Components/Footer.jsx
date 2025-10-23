import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      title: "GitHub",
      icon: <FaGithub className="text-white text-2xl hover:text-red-400 transition" />,
      link: "https://github.com/AlexandreJustinRepia",
    },
    {
      title: "Email",
      icon: <FaEnvelope className="text-white text-2xl hover:text-red-400 transition" />,
      link: "mailto:alexwaquiz11@gmail.com",
    },
  ];

  return (
    <footer
      className="bg-gray-900 text-white py-8 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* --- Copyright Notice --- */}
        <div className="text-center md:text-left">
          <p className="text-gray-400 text-sm sm:text-base">
            &copy; {currentYear} Alexandre Justin Repia. All rights reserved.
          </p>
        </div>

        {/* --- Social Links --- */}
        <div className="flex gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              className="flex items-center"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}