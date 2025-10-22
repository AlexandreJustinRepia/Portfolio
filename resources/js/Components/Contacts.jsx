import React from "react";
import ContactCard from "./ContactCard";
import { FaEnvelope, FaGithub } from "react-icons/fa";

export default function Contacts() {
  // Sample contact data (replace with your actual contact details)
  const contacts = [
    {
      title: "Email",
      icon: <FaEnvelope className="text-red-400 text-4xl" />,
      link: "mailto:alexwaquiz11@gmail.com",
      details: "alexwaquiz11@gmail.com",
    },
    {
      title: "GitHub",
      icon: <FaGithub className="text-red-400 text-4xl" />,
      link: "https://github.com/AlexandreJustinRepia",
      details: "Check out my repositories",
    },
  ];

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
        </div>

        {/* --- Contact Cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              title={contact.title}
              icon={contact.icon}
              link={contact.link}
              details={contact.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
}