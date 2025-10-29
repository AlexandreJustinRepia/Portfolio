import React, { useState, useRef } from "react";
import ContactCard from "./ContactCard";
import { FaEnvelope, FaGithub, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contacts({ modalState, setModalState, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "" &&
    captchaToken;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setModalState({
        isOpen: true,
        type: "error",
        message: "Please verify that you're not a robot.",
      });
      return;
    }

    setModalState({
      isOpen: true,
      type: "loading",
      message: "Sending your message...",
    });

    try {
      console.log("CAPTCHA token:", captchaToken);
      const response = await axios.post("/contact", {
        ...formData,
        "g-recaptcha-response": captchaToken,
      });

      if (response.data.success) {
        setModalState({
          isOpen: true,
          type: "success",
          message: "Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        recaptchaRef.current.reset();
      }
    } catch (error) {
      console.error(error);
      setModalState({
        isOpen: true,
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
      // Optionally reset CAPTCHA on error if needed
      // setCaptchaToken(null);
      // recaptchaRef.current.reset();
    }
  };

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
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block group">
            Contacts
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[3px] w-16 bg-red-500 rounded transition-all duration-500 ease-in-out group-hover:w-32"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Contact Cards */}
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              title={contact.title}
              icon={contact.icon}
              link={contact.link}
              details={contact.details}
            />
          ))}

          <div
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <FaPaperPlane className="text-red-400 text-4xl" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-400"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-400"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-red-400"
                  required
                ></textarea>

                {/* ✅ CAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptcha}
                    theme="dark"  // Customized to dark theme to match the portfolio's design
                    size="normal" // Can be changed to "compact" if a smaller size is preferred
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-400 font-semibold rounded-md border border-red-400 hover:bg-red-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!captchaToken || modalState.type === "loading" || !isFormValid}
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}